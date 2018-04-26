// react
import React, { Component } from 'react';
// modules
import axios from 'axios';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  handleChange = (event, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    const self = this;
    axios
      .post('/signup', this.state)
      .then(res => {
        self.props.handleAuth(res.data);
      })
      .catch(err => console.log(err));

    this.setState({ username: '', password: '', firstName: '', lastName: '' });
  };

  render() {
    const { username, password, firstName, lastName } = this.state;

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="row uniform">
          <div className="6u">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
          </div>
          <div className="6u">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="6u signup-email">
            <input
              type="email"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="6u signup-pw">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="submit-button">
            <a className="big button special" content="Submit">
              Sign Up
            </a>
            <div>
              <a className="subtle-link">Login instead</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Signup;
