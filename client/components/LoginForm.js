import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import LoginMutation from '../mutations/Login';
import { hashHistory } from 'react-router';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    }
  }
  
  componentDidUpdate(prevProps) {
    if(!prevProps.data.user && this.props.data.user) {
      hashHistory.push('/dashboard/overview')
    }
  }

  onLoginSubmit({ email, password }) {
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
        <Flip top>
          <h3 className="margin-top-large center">Login</h3>
        </Flip>
        <Fade top>
          <AuthForm
            errors={this.state.errors}
            onSubmit={this.onLoginSubmit.bind(this)}
          />
        </Fade>
      </div>
    );
  }
}

export default graphql(LoginMutation)(
  graphql(CurrentUserQuery)(LoginForm)
);