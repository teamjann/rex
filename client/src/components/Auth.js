import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

import Login from './Login';
import Signup from './Signup';

class Auth extends Component {
  state = {
    login: false,
    signup: false
  }

  handleLoginClick() {
    this.setState({
      login: true
    })
  }

  handleSignupClick() {
    this.setState({
      signup: true
    })
  }

  render() {
    if (this.state.login) {
      return <Login handleAuth={this.props.handleAuth}/>;
    } else if (this.state.signup) {
      return <Signup handleAuth={this.props.handleAuth}/>;
    } else {
      return (
        <div>
          <Button onClick={() => this.handleLoginClick()}>Login</Button>
          <Button onClick={() => this.handleSignupClick()}>Signup</Button>
        </div>
      );
    }
  }
}

export default Auth;