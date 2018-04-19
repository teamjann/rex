import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Header, Icon, Menu } from 'semantic-ui-react';
import swal from 'sweetalert2';

import BookItem from './BookItem.js';

const BookList = styled.ul`
  width: 100%;
  padding: 5px;
  list-style: none;
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
`;
class BrowseView extends Component {
  state = {
    userId: 3,
    activeItem: 'Recommendations',
    // [this.props.category]: {}
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
    const { category, id } = deletedInfo;
    const { userId } = this.state;

    console.log(deletedInfo);

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
        // swal('Deleted!', 'Your file has been deleted.', 'success');

        fetch(`/u/${userId}/${category}/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            const categoryItems = this.state[category];
            console.log('before delete', categoryItems);

            delete categoryItems[id];

            console.log('after delete', categoryItems);

            this.setState({
              [category]: categoryItems
            });

            console.log('new state', this.state);
          })
          .catch(err => console.log('delete unsuccessful', err));
      }
    });
  };

  updateBook() {}

  componentDidMount() {
    this.populateBooks();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleCompletedClick = (e, { name }) =>
    this.setState({ showCompleted: !this.state.showCompleted });

  render() {
    // const { category } = this.props;
    const category = 'books';
    const { activeItem, userId } = this.state;

    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="book" circular />
          <Header.Content>Books</Header.Content>
        </Header>

        <MenuBar>
          <Menu text>
            <Menu.Item header>Sort By</Menu.Item>
            <Menu.Item
              name="Recommendations"
              active={activeItem === 'Recommendations'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Oldest"
              active={activeItem === 'Oldest'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Newest"
              active={activeItem === 'Newest'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Show Completed"
              className="completedOption"
              active={this.state.showCompleted}
              onClick={this.handleCompletedClick}
            />
          </Menu>
        </MenuBar>

        <BookList>
          {Object.entries(this.state[category]).map(([bookId, bookInfo]) => {
            const { book, recommendations } = bookInfo;
            const recommendationCount = recommendations.length;
            return (
              <BookItem
                id={bookId}
                book={book}
                recommendations={recommendations}
                deleteBook={deletedInfo => this.deleteBook(deletedInfo)}
                category={category}
              />
            );
          })}
        </BookList>
      </Container>
    );
  }
}

export default BrowseView;
