import React, { Component } from "react";
import { Button, Popup, Item, Form, Input, TextArea } from "semantic-ui-react";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
import RecommendationListItem from "./RecommendationListItem";
import BrowseBookDetail from "../Browse/BrowseBookDetail";
import styled from "styled-components";
import { RSA_SSLV23_PADDING } from "constants";
import NavBar from "../NavBar";
const MenuBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  margin-left: 15%;
`;
const CheckOutButton = props => (
  <Popup
    style={{ fontSize: "12px" }}
    trigger={
      <Button
        style={{ fontSize: "12px" }}
        color="blue"
        as="a"
        href={props.url}
        icon="search"
        content="Check it out"
      />
    }
    content="Search for more information about the book."
    on="hover"
  />
);

class AddRecommenderButton extends Component {
  state = {
    toggle: false,
    firstName: "",
    lastName: "",
    comments: ""
  };

  handleSubmit = e => {
    //save to database, render new list of rec/comments;
    e.preventDefault();
    const { firstName, lastName, comments } = this.state;
    const id = this.props.id;

    const bookInfo = {
      id,
      firstName,
      lastName,
      comments
    };
    const category = "books";
    const userId = 3;
    //update recommendation table,
    fetch(`/u/${userId}/${category}/${bookInfo.id}`, {
      method: "POST",
      body: JSON.stringify(bookInfo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res =>
        fetch(`/u/${userId}/${category}`)
          .then(res => res.json())
          .then(categoryItems => {
            let newRecs = Object.entries(categoryItems).find(book => {
              return book[0] === id;
            })[1].recommendations;

            return this.props.handleRecUpdate(newRecs);
          })
      )
      .catch(err => {
        throw err;
      });

    this.setState({
      toggle: false,
      firstName: "",
      lastName: "",
      comments: ""
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button
            style={{ fontSize: "12px" }}
            color="blue"
            onClick={() => this.setState({ toggle: !this.state.toggle })}
            icon="add"
            content="Add a recommender"
          />
          <hr />

          {this.state.toggle && (
            <Form
              classNmae="add-recommender-form"
              style={{ fontSize: "12px" }}
              onSubmit={this.handleSubmit}
            >
              <Form.Group widths="equal">
                <Form.Field
                  required
                  id="form-input-control-first-name"
                  control={Input}
                  value={this.state.firstName}
                  onChange={e => this.setState({ firstName: e.target.value })}
                  label="First name"
                  placeholder="First name"
                />
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  value={this.state.lastName}
                  onChange={e => this.setState({ lastName: e.target.value })}
                  label="Last name"
                  placeholder="Last name"
                />
              </Form.Group>
              <Form.Field
                id="form-textarea-control-opinion"
                control={TextArea}
                value={this.state.comments}
                onChange={e => this.setState({ comments: e.target.value })}
                label="Comments"
                placeholder="Comments"
              />
              <Form.Field
                style={{ fontSize: "14px", backgroundColor: "beige" }}
                id="form-button-control-public"
                control={Button}
                content="Submit"
              />
            </Form>
          )}
        </div>
      </div>
    );
  }
}

//const MarkAsCompleteButton = () => <Button>Mark as done</Button>;
//const RemoveFromListButton = () => <Button>Remove from list</Button>;

const BrowseDetail = props => {
  const target = props.location.query;
  console.log("target", target);
  return (
    <div>
      <NavBar />
      <header className="book-detail">
        <BrowseBookDetail book={target.book} />
      </header>
      <Item.Group>
        {target.recommendations.map(recommendation => (
          <RecommendationListItem
            id={target.id}
            recommendation={recommendation}
            recommendations={target.recommendations}
          />
        ))}
      </Item.Group>
      <MenuBar>
        <div>
          <AddRecommenderButton
            handleRecUpdate={target.handleRecUpdate}
            book={target.book}
            id={target.id}
            recommendations={target.recommendations}
          />
        </div>
        <div
          style={{
            fontsize: "30px",
            marginBottom: "10px",
            marginRight: "50px"
          }}
        >
          <CheckOutButton url={target.book.url} />
        </div>

        <Link to="/browse">
          <div style={{ fontsize: "40px", marginTop: "10px" }}> {`< back`}</div>
        </Link>
      </MenuBar>
    </div>
  );
};

export default BrowseDetail;
