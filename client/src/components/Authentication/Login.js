// React
import React, { Component } from 'react';
// modules
import axios from 'axios';
// components

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = (event, { name, value }) => this.setState({ [name]: value });

  handleSubmit = event => {
    const self = this;
    const state = this.state;
    axios
      .post('/login', this.state)
      .then(res => {
        console.log('state being sent, ', state);
        self.props.handleAuth({ ...res.data, state });
      })
      .catch(err => console.log(err));

    this.setState({ username: '', password: '' });
  };

  render() {
    const { name, email } = this.state;

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="row uniform">
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
              Login
            </a>
            <div>
              <a className="subtle-link">Sign up instead</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
