// React
import React, { Component } from 'react';
// Styling
import styled from 'styled-components';
import { Container, Header, Icon } from 'semantic-ui-react';
import swal from 'sweetalert2';
// Components
import SortMenu from './SortMenu';
import BookItem from './BookItem';

const BookList = styled.ul`
  width: 100%;
  padding: 5px;
  list-style: none;
`;

class BrowseView extends Component {
  state = {
    userId: 3,
    activeItem: 'Recommendations',
    books: {},
    showCompleted: false
  };

  populateBooks() {
    const category = 'books';
    const { userId } = this.state;

    fetch(`/u/${userId}/${category}`)
      .then(res => res.json())
      .then(categoryItems => {
        this.setState({
          [category]: categoryItems
        });
      })
      .catch(err => {
        throw err;
      });
  }

  deleteBook = deletedInfo => {
    // Pop-up asking for delete confirmation
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        // On confirmation, send DELETE request to server
        const { category, id } = deletedInfo;
        const { userId } = this.state;

        fetch(`/u/${userId}/${category}/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            // On server response, delete item from state
            const categoryItems = this.state[category];

            delete categoryItems[id];

            this.setState({
              [category]: categoryItems
            });
          })
          .catch(err => console.log('delete unsuccessful', err));
      }
    });
  };

  markCompleted = itemInfo => {
    const { userId } = this.state;
    const { category, id } = itemInfo;

    // Rating pop-up
    swal({
      title: 'Rate the recommendation:',
      showCancelButton: true,
      type: 'question',
      input: 'range',
      inputAttributes: {
        min: 0,
        max: 5,
        step: 0.5
      },
      inputValue: 2.5
    }).then(result => {
      if (result.value) {
        // If rating confirmed, update in server
        fetch(`/u/${userId}/${category}/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'PUT',
          body: JSON.stringify({
            status: 'completed',
            rating: result.value
          })
        })
          .then(res =>
            // Update rating / status in state
            this.setState({
              [category]: {
                ...this.state[category],
                [id]: {
                  ...this.state[category][id],
                  book: {
                    ...this.state[category][id].book,
                    status: 'completed',
                    rating: result.value
                  }
                }
              }
            })
          )
          .catch(err => console.log('insert failed'));
      }
    });
  };

  componentDidMount() {
    this.populateBooks();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleCompletedClick = (e, { name }) =>
    this.setState({ showCompleted: !this.state.showCompleted });

  render() {
    const category = 'books';
    const { activeItem, userId, showCompleted } = this.state;

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="book" circular />
          <Header.Content>Books</Header.Content>
        </Header>

        <SortMenu
          activeItem={activeItem}
          showCompleted={showCompleted}
          handleItemClick={this.handleItemClick}
          handleCompletedClick={this.handleCompletedClick}
        />

        <BookList>
          {Object.entries(this.state[category]).map(([bookId, bookInfo]) => {
            const { book, recommendations } = bookInfo;
            const recommendationCount = recommendations.length;
            const { showCompleted } = this.state;

            if (showCompleted || book.status === 'active') {
              return (
                <BookItem
                  id={bookId}
                  book={book}
                  recommendations={recommendations}
                  deleteBook={deletedInfo => this.deleteBook(deletedInfo)}
                  markCompleted={this.markCompleted}
                  category={category}
                />
              );
            }
          })}
        </BookList>
      </Container>
    );
  }
}

export default BrowseView;
