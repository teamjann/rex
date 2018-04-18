import React, { Component } from "react";
import styled from "styled-components";
import { Container, Header, Icon, Menu } from "semantic-ui-react";

import BookItem from "./BookItem.js";

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
    //[this.props.category]: {}
    books: {}
  };

  componentDidMount() {
    // const { category } = this.props;
    const category = "books";
    const { userId } = this.state;
    console.log(userId, category);

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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    //const { category } = this.props;
    const category = "books";
    const { activeItem } = this.state;

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
              active={activeItem === "Recommendations"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Oldest"
              active={activeItem === "Oldest"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Newest"
              active={activeItem === "Newest"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </MenuBar>

        <BookList>
          {Object.entries(this.state[category]).map(([bookId, bookInfo]) => {
            const { book, recommendations } = bookInfo;
            const recommendationCount = recommendations.length;
            return <BookItem book={book} recommendations={recommendations} />;
          })}
        </BookList>
      </Container>
    );
  }
}

export default BrowseView;
