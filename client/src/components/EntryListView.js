// React
import React from 'react';
// Modules
import axios from 'axios';
import proxify from 'proxify-url';
import { Search, Rating } from 'semantic-ui-react';
import _ from 'lodash';
// Components
import NavBar from './NavBar';

// Category, searchbar, API results for adding recommendations
class EntryListView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'books',
      // Format necessary for semanti-ui search dropdown
      categoryOptions: [
        {
          text: 'Books',
          value: 'books',
        },
        {
          text: 'Movies',
          value: 'movies',
        },
        {
          text: 'Songs',
          value: 'songs',
        },
        {
          text: 'Foods',
          value: 'foods',
        },
      ],
      results: [],
    };
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.search = this.search.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.renderResult = this.renderResult.bind(this);
  }

  // Brung up entryDetail when user selects book from search
  // detail view when list item from drop down is actively selected
  async handleResultSelect(e, data) {
    const self = this;
    if (this.state.category === 'books') {
      const params = {
        id: data.result.apiId,
        key: process.env.bookAPIKey,
      };
      // Proxify necessary for Goodreads CORS requests
      const url = proxify(
        `https://www.goodreads.com/book/show.xml?id=${params.id}&key=${params.key}`,
        { inputFormat: 'xml' },
      );

      axios
        .get(url)
        .then((res) => {
          const { book } = res.data.query.results.GoodreadsResponse;
          let authors;

          // Goodreads sends array for multiple authors, object for single
          if (Array.isArray(book.authors.author)) {
            authors = book.authors.author
              .map((author) => {
                // Goodreads includes illustrators, etc as 'authors'
                // Creates string of authors and their roles
                if (author.role) {
                  return `${author.name} (${author.role})`;
                }
                return author.name;
              })
              .join(', ');
          } else {
            authors = book.authors.author.name;
          }

          self.setState({
            resultDetail: {
              title: book.title,
              rating: book.average_rating,
              apiId: book.id,
              authors,
              yearPublished: book.publication_year,
              description: book.description
                .split('<br /><br />')
                .map(paragraph => paragraph.replace(/<.*?>/gm, '')),
              imageUrl: book.image_url,
            },
          });

          // Reactrouting
          self.props.history.push({
            pathname: `/entry/${self.state.resultDetail.apiId}`,
            state: { result: self.state.resultDetail },
          });
        })
        .catch((err) => {
          throw err;
        });
    } else if (this.state.category === 'movies') {
      const movie = data.result.all;
      await self.setState({
        resultDetail: {
          title: movie.title,
          rating: movie.vote_average,
          apiId: movie.id,
          yearPublished: movie.release_date.slice(0, 4),
          description: [movie.overview],
          imageUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
          link: movie.link,
        },
      });
      self.props.history.push({
        pathname: `/entry/${self.state.resultDetail.apiId}`,
        state: { result: self.state.resultDetail },
      });
    } else if (this.state.category === 'foods') {
      const food = data.result.all;
      axios.post('/review', {
        name: food.alias
      })
        .then(function (response) {
          self.setState({
            resultDetail: {
              title: food.name,
              rating: food.rating,
              apiId: food.id,
              yearPublished: food.location.address1,
              description: [response.data.map(review => review.text)],
              imageUrl: food.image_url,
              link: food.url,
            },
          });
          self.props.history.push({
            pathname: `/entry/${self.state.resultDetail.apiId}`,
            state: { result: self.state.resultDetail },
          });


        })
        .catch(function (error) {
          console.log(error);
        });

    } else if (this.state.category === 'songs') {
      const song = data.result.all;
      axios.post('/song', {
        song: song.mbid,
      })
        .then(function (response) {
          let summary = response.data.track.wiki.summary;
          self.setState({
            resultDetail: {
              title: response.data.track.name,
              yearPublished: response.data.track.wiki.published.slice(7, 11) || '',
              description: [summary.slice(0, summary.indexOf('<'))],
              imageUrl: response.data.track.album.image[2]['#text'],
              link: song.url,
              apiId: song.mbid
            },
          });
          self.props.history.push({
            pathname: `/entry/${self.state.resultDetail.apiId}`,
            state: { result: self.state.resultDetail },
          });
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  search(e, data) {
    e.preventDefault();

    this.setState({
      results: [],
    });

    const self = this;

    if (this.state.category === 'books') {
      axios.post('/books', { title: data.value })
        .then((res) => {
          const resultItems = res.data.query.results.GoodreadsResponse.search.results.work.slice(0, 5);
          const books = resultItems.map(book => ({
            title: book.best_book.title,
            rating: Number(book.average_rating),
            apiId: Number(book.best_book.id.content),
            author: book.best_book.author.name,
            imageUrl: book.best_book.image_url,
          }));
          self.setState({
            results: books,
          });
        });
    } else if (this.state.category === 'movies') {
      axios.post('/movie', { title: data.value })
        .then((res) => {
          const resultItems = res.data.results.slice(0, 5);
          const movies = resultItems.map(movie => ({
            title: movie.title,
            rating: movie.vote_average,
            apiId: movie.id,
            author: movie.release_date,
            imageUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
            all: movie,
          }));
          self.setState({
            results: movies,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.category === 'songs') {
      axios.post('/songs', { song: data.value })
        .then((res) => {
          const resultItems = res.data.results.trackmatches.track.slice(0, 5);
          const songs = resultItems.map(song => ({
            title: song.name,
            apiId: song.mbid,
            author: song.artist,
            imageUrl: song.image[1]['#text'],
            all: song,
          }));
          self.setState({
            results: songs,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (this.state.category === 'foods') {
      axios.post('/food', { food: data.value })
        .then((res) => {
          const resultItems = res.data;
          const foods = resultItems.map(food => ({
            title: food.name,
            rating: food.rating,
            apiId: food.id,
            author: food.location.address1,
            imageUrl: food.image_url,
            all: food,
          }));
          self.setState({
            results: foods,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleDropDownChange(event) {
    this.setState({
      category: event.target.value,
    });
  }

  renderResult(result) {
    return (
      <div className="search-block">
        <img className="book-image" src={result.imageUrl} alt="book thumbnail" />
        <h4>{result.title}</h4>
        <p>{result.author}</p>
        <Rating size="tiny" maxRating={5} defaultRating={result.rating} disabled icon="star" />
      </div>
    );
  }

  render() {
    const throttledSearch = _.debounce(this.search, 300);
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="page-title welcome">
            <h1>Add New Recommendation</h1>
          </div>
          <div className="search-fields">
            <div className="select">
              <i className="fas fa-chevron-down" />
              <select
                className="cat-select"
                placeholder="Select Category"
                onChange={this.handleDropDownChange}
                value={this.state.category}
              >
                {this.state.categoryOptions.map((option, i) =>
                  (i === 0 ? (
                    <option key={i} value={option.value} selected>
                      {option.text}
                    </option>
                  ) : (
                      <option key={i} value={option.value}>
                        {option.text}
                      </option>
                    )))}
              </select>
            </div>
            <Search
              onSearchChange={throttledSearch}
              results={this.state.results}
              resultRenderer={this.renderResult}
              onResultSelect={this.handleResultSelect}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EntryListView;
