import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CountriesByUser from '../queries/CountriesByUser';

class CountriesByUserCell extends Component {
  render() {
    if(!this.props.data.countriesByUser) {
      return null;
    }
    return (
      <div>
        {this.props.data.countriesByUser.length}
      </div>
    );
  }
}


export default graphql(CountriesByUser, {
  options: (props) => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(CountriesByUserCell);