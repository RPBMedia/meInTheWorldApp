import React, { Component } from 'react';
import AuthForm from './AuthForm';

class RegisterForm extends Component {
  onRegisterSubmit() {
    console.log('Register button pressed');
  }

  render() {
    return (
      <div>
        <h3 className="margin-top-large center">Welcome to Me In The World</h3>
        <h4 className="center">Please fill in your personal info</h4>
        <AuthForm
          register
          onSubmit={this.onRegisterSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default RegisterForm;