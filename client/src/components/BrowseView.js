import React, { Component } from "react";
import styled from "styled-components";
import { Container, Header, Icon, Menu } from "semantic-ui-react";
import BookItem from "./BookItem";
import BrowseDetail from "./Browse/BrowseDetail";
import NavBar from "./NavBar";
import "./BrowseView.css";
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
    activeItem: "Recommendations",
    books: [],
    clickedBook: {},
    clickedRecommendations: [],
    detailedView: false
  };

  componentDidMount() {
    const category = "books";
    const { userId } = this.state;

    fetch(`/u/${userId}/${category}`)
      .then(res => res.json())
      .then(categoryItems => {
        this.setState({
          [category]: Object.entries(categoryItems)
        });
      })
      .catch(err => {
        throw err;
      });
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    //declare sort type and the array of books
    let sortType = this.state.activeItem;
    const bookArray = this.state.books;
    //sort the array of recommendation entries of each book (each book may have many rec entries)
    const getLatestDate = arr => {
      return arr.reduce((latestDate, rec) => {
        return Math.max(new Date(rec.date_added), latestDate);
      }, new Date(arr[0].date_added));
    };
    //sort the array of books
    const sortBy = (a, b) => {
      let latestDate_a = getLatestDate(a[1].recommendations);
      let latestDate_b = getLatestDate(b[1].recommendations);
      if (sortType === "Newest") {
        return latestDate_b - latestDate_a;
      } else if (sortType === "Oldest") {
        return latestDate_a - latestDate_b;
      }
    };
    // set state with the newly sorted array of books
    let sortedArray = bookArray.sort(sortBy);
    this.setState({
      books: sortedArray
    });
  };

  handleClick = props => {
    this.setState({
      detailedView: true,
      clickedBook: props.book,
      clickedRecommendations: props.recommendations,
      clickedId: props.id
    });
  };

  render() {
    const self = this;
    const category = "books";
    const { activeItem } = this.state;
    return (
      <div>
        <NavBar />
        <Container>
          <Header as="h1" icon textAlign="center">
            <Icon name="book" circular />
            <Header.Content className="menu-header">Books</Header.Content>
          </Header>

          <MenuBar>
            <Menu text>
              <Menu.Item className="menu-item-header">Sort By</Menu.Item>
              <Menu.Item
                className="menu-item"
                name="Recommendations"
                active={activeItem === "Recommendations"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                className="menu-item"
                name="Oldest"
                active={activeItem === "Oldest"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                className="menu-item"
                name="Newest"
                active={activeItem === "Newest"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </MenuBar>

          <BookList>
            {this.state[category].map(([bookId, bookInfo]) => {
              const { book, recommendations } = bookInfo;
              return (
                <BookItem
                  handleRecUpdate={this.handleRecUpdate}
                  handleClick={this.handleClick}
                  id={bookId}
                  book={book}
                  recommendations={recommendations}
                />
              );
            })}
          </BookList>
        </Container>
      </div>
    );
  }
}

export default BrowseView;
