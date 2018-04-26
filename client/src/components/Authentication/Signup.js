// react
import React, { Component } from 'react';
// modules
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    this.handleChangefirstName = this.handleChangefirstName.bind(this);
    this.handleChangelastName = this.handleChangelastName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangefirstName(e) {
    this.setState({ firstName: e.target.value });
  }

  handleChangelastName(e) {
    this.setState({ lastName: e.target.value });
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

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
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="row uniform">
          <div className="6u">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChangefirstName}
            />
          </div>
          <div className="6u">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChangelastName}
            />
          </div>
          <div className="6u signup-email">
            <input
              type="email"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
          </div>
          <div className="6u signup-pw">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
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
