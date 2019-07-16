import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import LoginMutation from '../mutations/Login';


class LoginForm extends Component {
  onLoginSubmit({ email, password }) {
    console.log('Login button pressed');
    this.props.mutate({
      variables: {
        email,
        password
      }
    });
  }


  render() {
    return (
      <div>
        <h3 className="margin-top-large center">Login</h3>
        <AuthForm
          onSubmit={this.onLoginSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(LoginMutation)(LoginForm);