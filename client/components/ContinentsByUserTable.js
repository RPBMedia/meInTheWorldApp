import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';

class ContinentsByUserTable extends Component {
  render() {
    if(!this.props.continents) {
      return (
        <div>
          You have no continents yet
        </div>
      )
    }
    return (
      <div>
        {this.props.continents.length}
      </div>
    );
  }
}

export default ContinentsByUserTable;