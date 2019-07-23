import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';
import { compareByName } from '../utils';
import DeleteLocationMutation from '../mutations/DeleteLocation';

class UnitsByUserTable extends Component {

  onUnitDelete(unit) {
    
    //For continents, only id is needed
    const unitId = unit.id;
    let continentId = null;
    let countryId = null;

    //If the unit is a country, check it's continent
    if(unit.continent && !unit.country) {
      continentId = unit.continent.id
    } else if(unit.continent && unit.country){
      continentId = unit.continent.id
      countryId = unit.country.id
    }
    
    this.props.mutate({
      variables: {
        id: unitId,
        countryId,
        continentId
      }
    }).then( () => this.props.onUpdate());
  }

  renderUnitList() {
    const sortedUnits = this.props.units.slice().sort(compareByName);
    return sortedUnits.map(unit => {
      return (
        <li key={unit.id} className="collection-item row flex">
          <div className="cell bold col s3">
            Name:
          </div>
          <div className="cell col s6">  
            {unit.name}
          </div>
          <div className="cell col s3">
            <i
              className="right clickable material-icons"
              onClick={() => this.onUnitDelete(unit)}
            >
              delete
            </i>
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

export default graphql(DeleteLocationMutation)(UnitsByUserTable);