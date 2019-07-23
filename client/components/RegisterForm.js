import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import RegisterMutation from '../mutations/Register';
import { hashHistory } from 'react-router';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    console.log(this.props, nextProps)
    if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard/overview')
    }
  }

  onRegisterSubmit({ email, password, confirmPassword, name }) {
    console.log('Register button pressed');
    if(password !== confirmPassword) {
      const errors = ['Passwords do not match. Please try again'];
      this.setState({
        errors,
      });
    }
    else {
      this.props.mutate({
        variables: {
          email,
          password,
          name
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      }).catch(res => { 
        let errors = null;
        if(res.graphQLErrors && res.graphQLErrors.length > 0){
          errors = res.graphQLErrors.map(error => error.message);
          this.setState({
            errors,
          });
        }
       });
    }
  }

  render() {
    return (
      <div>
        <h3 className="margin-top-large center">Welcome to Me In The World</h3>
        <h4 className="center">Please fill in your personal info</h4>
        <AuthForm
          register
          errors={this.state.errors}
          onSubmit={this.onRegisterSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(RegisterMutation)(
  graphql(CurrentUserQuery)(RegisterForm)
);