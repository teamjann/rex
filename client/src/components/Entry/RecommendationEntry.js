import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, TextArea, Button, Container, Divider } from 'semantic-ui-react';
import axios from 'axios';

class RecommendationEntry extends Component {
  state = {
    userId: this.props.userId,
    firstName: '',
    lastName: '',
    comments: '',
    inserted: false,
    category: this.props.category,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { userId, firstName, lastName, comments } = this.state;
    // send our data to server and server will save to the db
    const {
      title,
      authors,
      description,
      imageUrl,
      link,
      rating,
      yearPublished,
      apiId,
    } = this.props.entry;

    const category = this.state.category;

    const bookInfo = {
      title,
      imageUrl,
      authors,
      description,
      link,
      rating,
      yearPublished,
      firstName,
      lastName,
      comments,
      category,
      userId,
      apiId,
    };

    axios
      .post(`/u/${userId}/${category}`, {
        bookInfo: JSON.stringify(bookInfo),
      })
      .then(res => {
        console.log('made it in fetch');
        if (res.status === 404) {
          alert(`${title} already exists in your recommendations!`);
        } else {
          this.setState({
            inserted: true,
          });
        }
      })
      .catch(err => {
        throw err;
      });
  };

  render() {
    return this.state.inserted ? (
      <Redirect
        to={{
          pathname: '/browse',
          state: { userId: this.state.userId, category: this.state.category },
        }}
      />
    ) : (
      <Container>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Field
              required
              id="form-input-control-first-name"
              className="rec-entry"
              control={Input}
              label="Recommender"
              placeholder="First name"
              name="firstName"
              onChange={this.handleChange}
            />
            <Form.Field
              id="form-input-control-last-name"
              className="rec-entry"
              control={Input}
              placeholder="Last name"
              name="lastName"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field
            id="form-textarea-control-opinion"
            className="rec-entry"
            control={TextArea}
            label="Comments"
            placeholder="Comments"
            name="comments"
            onChange={this.handleChange}
          />
          <Form.Field id="form-button-control-public" control={Button} content="Save" />
        </Form>
      </Container>
    );
  }
}

export default RecommendationEntry;
