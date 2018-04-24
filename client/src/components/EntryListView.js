// React
import React from 'react';
// Modules
import axios from 'axios';
import proxify from 'proxify-url';
import { Search, Dropdown, Rating, Container } from 'semantic-ui-react';
import _ from 'lodash';
// Components
import NavBar from './NavBar';
import './EntryListView.css';

// Category, searchbar, API results for adding recommendations
class EntryListView extends React.Component {
  constructor() {
    super();
    this.state = {
      category: 'books',
      // Format necessary for semanti-ui search dropdown
      categoryOptions: [
        {
          text: 'books',
          value: 'books',
        },
        {
          text: 'movies',
          value: 'movies',
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
  handleResultSelect(e, data) {
    const params = {
      id: data.result.apiId,
      key: 'GOODREADS_API_KEY_HERE',
    };
    const self = this;
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
            link: book.link,
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
  }

  search(e, data) {
    e.preventDefault();

    this.setState({
      results: [],
    });

    if (this.state.category === 'books') {
      const params = {
        q: data.value.replace(/\s+/g, '-'),
        key: 'GOODREADS_API_KEY_HERE',
      };
      // Proxified URL (for goodReads Cors requests)
      const url = proxify(
        `https://www.goodreads.com/search/index.xml?q=${params.q}&key=${params.key}`,
        { inputFormat: 'xml' },
      );
      const self = this;

      axios.get(url).then((res) => {
        const resultItems = res.data.query.results.GoodreadsResponse.search.results.work;
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
    }
  }

  //   // Beginning of using movies API
  //   else if (this.state.category === 'movies') {
  //     const params = {
  //       api_key: 'process.env.SOME_API_KEY_HERE',
  //       query: data.value,
  //     };
  //     axios
  //       .get('https://api.themoviedb.org/3/search/movie?', { params })
  //       .then(res => console.log(res.data))
  //       .catch(err => console.log(err));
  //   }
  // }

  handleDropDownChange(event, data) {
    this.setState({
      category: data.value,
    });
  }

  // Renders search results from API under searchBar
  // TODO: add handling for movies
  renderResult(result) {
    return (
      <div>
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
        <Container>
          <div className="page-title">
            <h1>Add New Recommendations</h1>
          </div>

          <Dropdown
            placeholder="Select Category"
            selection
            options={this.state.categoryOptions}
            onChange={this.handleDropDownChange}
          />
          <Search
            onSearchChange={throttledSearch}
            results={this.state.results}
            resultRenderer={this.renderResult}
            onResultSelect={this.handleResultSelect}
          />
        </Container>
      </div>
    );
  }
}

export default EntryListView;
