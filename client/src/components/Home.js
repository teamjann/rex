import React, { Component } from "react";
import styled from "styled-components";
import "./Home.css";
import book from "../images/book.png";
import music from "../images/music.png";
import movie from "../images/movie.png";
import food from "../images/food.png";
import NavBar from "./NavBar";
import { Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import {
  Dropdown,
  Menu,
  Button,
  Container,
  Header,
  Icon
} from "semantic-ui-react";

import { Row, Col } from "reactstrap";

import BookDetail from "./Entry/BookDetail";

const NewRecommendationButton = () => (
  <div className="newRecButton">
    <Link to="/entry">
      <Button size="massive" color="teal">
        New Recommendations
        <Icon className="plus" name="plus" />
      </Button>
    </Link>
  </div>
);

class Home extends Component {
  state = {
    category: ""
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="userName">Hello, Shu</div>

        <Row>
          <Col>
            <Link to="/browse">
              <img src={book} width="80" height="80" />
            </Link>
          </Col>
          <Col>
            <img src={food} width="80" height="80" />
          </Col>
          <Col>
            <img src={music} width="80" height="80" />
          </Col>
          <Col>
            <img src={movie} width="80" height="80" />
          </Col>
        </Row>

        <NewRecommendationButton />
      </div>
    );
  }
}

class FindRecommendationButton extends Component {
  state = {
    category: ""
  };

  render() {
    return (
      <div>
        <Menu vertical>
          <Dropdown
            text="Find Something from"
            pointing="left"
            className="link item"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  this.setState({ category: "books" });
                  //<Redirect to="/browse" />;
                  //redirect is like component
                }}
              >
                <Link to="/browse">Books</Link>
              </Dropdown.Item>
              <Dropdown.Item>Movies</Dropdown.Item>
              <Dropdown.Item>Restaurants</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

export default Home;
