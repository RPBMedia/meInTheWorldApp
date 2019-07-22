import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';

class ContinentsByUserCell extends Component {
  render() {
    if(!this.props.data.continentsByUser) {
      return null;
    }
    return (
      <div>
        {this.props.data.continentsByUser.length}
      </div>
    );
  }
}


export default graphql(ContinentsByUser, {
  options: (props) => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(ContinentsByUserCell);