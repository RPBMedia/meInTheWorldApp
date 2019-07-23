import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import LoginMutation from '../mutations/Login';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    }
  }
  
  componentWillUpdate(nextProps) {
    console.log(this.props, nextProps)
    if(!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard/overview')
    }
  }

  onLoginSubmit({ email, password }) {
    console.log('Login button pressed');
    this.props.mutate({
      variables: {
        email,
        password
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


  render() {
    return (
      <div>
        <h3 className="margin-top-large center">Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onLoginSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(LoginMutation)(
  graphql(CurrentUserQuery)(LoginForm)
);