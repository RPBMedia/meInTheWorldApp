import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import LocationsByUser from '../queries/LocationsByUser';

class LocationsByUserCell extends Component {
  render() {
    if(!this.props.data.locationsByUser) {
      return null;
    }
    return (
      <div>
        {this.props.data.locationsByUser.length}
      </div>
    );
  }
}


export default graphql(LocationsByUser, {
  options: (props) => {
    return {
      variables: {
        id: props.userId
      }
    }
  }
})(LocationsByUserCell);