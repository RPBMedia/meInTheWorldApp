import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';
import { compareByName } from '../utils';

class UnitsByUserTable extends Component {
  renderUnitList() {
    const sortedUnits = this.props.units.slice().sort(compareByName);
    return sortedUnits.map(unit => {
      return (
        <li key={unit.id} className="collection-item row flex">
          <div className="cell bold s3">
            Name:
          </div>
          <div className="cell s9">  
            {unit.name}
          </div>
        </li>
      )
    })
  }
  render() {
    const {label, emptyLabel} = this.props;
    if(!this.props.units ||(this.props.units && this.props.units.length === 0)) {
      return (
        <div>
          {emptyLabel}
        </div>
      )
    }
    return (
      <div>
        <div>
          <b>{label}</b> {this.props.units.length}
        </div>
        <ul className="collection">
          {this.renderUnitList()}
        </ul>
      </div>
    );
  }
}

export default UnitsByUserTable;