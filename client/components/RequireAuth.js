import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      
      if(!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push('/login');
      }
    }
    // componentDidUpdate(prevProps) {
    //   debugger;
    //   if(!this.props.data.loading && !this.props.data.user) {
    //     hashHistory.push('/dashboard/overview')
    //   }
    // }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
