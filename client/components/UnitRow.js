import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { graphql } from 'react-apollo';
import DeleteContinentMutation from '../mutations/DeleteContinent';
import DeleteCountryMutation from '../mutations/DeleteCountry';
import DeleteLocationMutation from '../mutations/DeleteLocation';

class UnitRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestOngoing: false,
    }
  }

  onDelete(unit) {
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
      }).then( () => {
        // this.setState({
        //   requestOngoing: false
        // });
        this.props.onUpdate()
      });
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
      }).then( () => {
        // this.setState({
        //   requestOngoing: false
        // });
        this.props.onUpdate()
      });
    } else {
      console.log('Calling deleteContinent with params: ', unitId, userId);
      this.props.deleteContinentMutation({
        variables: {
          id: unitId,
          userId
        },
      }).then( () => {
        // this.setState({
        //   requestOngoing: false
        // });
        this.props.onUpdate()
      });
    }
    
  }

  render() {
    const {unit} = this.props;
    return (
      <li className="collection-item row flex">
          <div className="cell col s3">  
            {unit.name}
          </div>
          <div className="cell col s3">  
            {unit.number}
          </div>
          {this.props.editable && 
            <div className="cell col s3">
              {this.state.requestOngoing &&
              <div className="right">
                <Loader
                  type="Oval"
                  color="#26a69a"
                  height="20"	
                  width="20"
                />
              </div>
              }
              {this.state.requestOngoing === false &&
                <i
                  className="right clickable material-icons"
                  onClick={() => {
                    this.setState({
                      requestOngoing: true,
                    })
                    this.onDelete(unit);
                  }}
                >
                  delete
                </i>
              }
            </div>
          }
        </li>
    );
  }
}

export default graphql(DeleteLocationMutation, {name: 'deleteLocationMutation'})(
  graphql(DeleteCountryMutation, {name: 'deleteCountryMutation'})(
    graphql(DeleteContinentMutation, {name: 'deleteContinentMutation'})(UnitRow)
  )
);