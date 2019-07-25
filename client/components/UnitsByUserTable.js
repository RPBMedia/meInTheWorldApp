import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ContinentsByUser from '../queries/ContinentsByUser';
import { compareByName } from '../utils';
import DeleteContinentMutation from '../mutations/DeleteContinent';
import DeleteCountryMutation from '../mutations/DeleteCountry';
import DeleteLocationMutation from '../mutations/DeleteLocation';

class UnitsByUserTable extends Component {

  onUnitDelete(unit) {
    //For continents, only id is needed
    const unitId = unit.id;
    const userId = unit.user.id;
    let continentId = null;
    let countryId = null;
    //If the unit is a country, check it's continent
    if(unit.__typename === 'CountryType') {
      continentId = unit.continent && unit.continent.id

      console.log('Calling deleteCountry with params: ', unitId, userId);
      this.props.deleteCountryMutation({
        variables: {
          id: unitId,
          userId,
          continentId
        }
      }).then( () => this.props.onUpdate());
    }
    //If it is a location, check both continent and country
    else if(unit.__typename === 'LocationType'){
      continentId = unit.continent && unit.continent.id
      countryId = unit.country && unit.country.id

      console.log('Calling deleteLocation with params: ', unitId, userId, continentId, countryId);
      this.props.deleteLocationMutation({
        variables: {
          id: unitId,
          userId,
          countryId,
          continentId
        }
      }).then( () => this.props.onUpdate());
    } else {
      console.log('Calling deleteContinent with params: ', unitId, userId);
      this.props.deleteContinentMutation({
        variables: {
          id: unitId,
          userId
        }
      }).then( () => this.props.onUpdate());
    }
    
  }

  renderUnitList() {
    const sortedUnits = this.props.sorted ? this.props.units : this.props.units.slice().sort(compareByName);
    return sortedUnits.map(unit => {
      return (
        <li key={unit.id} className="collection-item row flex">
          <div className="cell col s3">  
            {unit.name}
          </div>
          <div className="cell col s3">  
            {unit.number}
          </div>
          {this.props.editable && 
            <div className="cell col s3">
              <i
                className="right clickable material-icons"
                onClick={() => this.onUnitDelete(unit)}
              >
                delete
              </i>
            </div>
          }
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

export default graphql(DeleteLocationMutation, {name: 'deleteLocationMutation'})(
  graphql(DeleteCountryMutation, {name: 'deleteCountryMutation'})(
    graphql(DeleteContinentMutation, {name: 'deleteContinentMutation'})(UnitsByUserTable)
  )
);


// export default graphql(DeleteEntity1Mutation)(
//   graphql(DeleteEntity2Mutation)(
//     graphql(DeleteEntity3Mutation)(UnitsByUserTable)
//   )
// );