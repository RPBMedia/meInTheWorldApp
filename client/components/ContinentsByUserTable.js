import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';
import { compareByName } from '../utils';

class ContinentsByUserTable extends Component {
  renderContinentList() {
    const sortedContinents = this.props.continents.slice().sort(compareByName);
    return sortedContinents.map(continent => {
      return (
        <li key={continent.id} className="collection-item row flex">
          <div className="cell bold s3">
            Name:
          </div>
          <div className="cell s9">  
            {continent.name}
          </div>
        </li>
      )
    })
  }
  render() {
    if(!this.props.continents ||(this.props.continents && this.props.continents.length === 0)) {
      return (
        <div>
          You have no continents yet
        </div>
      )
    }
    return (
      <div>
        <div>
          <b>Total continents:</b> {this.props.continents.length}
        </div>
        <ul className="collection">
          {this.renderContinentList()}
        </ul>
      </div>
    );
  }
}

export default ContinentsByUserTable;