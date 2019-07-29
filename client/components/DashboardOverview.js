import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import UsersQuery from '../queries/Users';
import UnitsByUserTable from './UnitsByUserTable';
import {
  compareByNumberOfContinents,
  compareByNumberOfCountries,
  compareByNumberOfLocations,
  compareByArrayLength,
} from '../utils';
import InfoCard from './InfoCard';
import StatisticsRow from './StatisticsRow';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalContinents: null,
      totalCountries: null,
      totalLocations: null,
    }
  }

  getTotalContinents() {
    return this.props.currentUserQuery.user.continents.length;
  }

  getTotalCountries() {
    return this.props.currentUserQuery.user.countries.length;
  }

  getTotalLocations() {
    return this.props.currentUserQuery.user.locations.length;
  }

  getContinentRanking() {
    const rankedArray = this.props.usersQuery.users.map(({id, continents}) => {
      return {
        id,
        numberOfContinents: continents.length
      }
    }).sort(compareByNumberOfContinents);

    let result = null;
    for(let i = 0; i < rankedArray.length; i++) {
      if(rankedArray[i].id === this.props.currentUserQuery.user.id) {
        result = i+1;
        break;
      }
    }
    return result;
  }

  getCountryRanking() {
    const rankedArray = this.props.usersQuery.users.map(({id, countries}) => {
      return {
        id,
        numberOfCountries: countries.length
      }
    }).sort(compareByNumberOfCountries);

    let result = null;
    for(let i = 0; i < rankedArray.length; i++) {
      if(rankedArray[i].id === this.props.currentUserQuery.user.id) {
        result = i+1;
        break;
      }
    }
    return result;
  }

  getLocationRanking() {
    const rankedArray = this.props.usersQuery.users.map(({id, locations}) => {
      return {
        id,
        numberOfLocations: locations.length
      }
    }).sort(compareByNumberOfLocations);

    let result = null;
    for(let i = 0; i < rankedArray.length; i++) {
      if(rankedArray[i].id === this.props.currentUserQuery.user.id) {
        result = i+1;
        break;
      }
    }
    return result;
  }

  getMostVisitedCountries() {
    let max = 0;
    const countriesByNumber = this.props.currentUserQuery.user.countries.map(country => {
      return {
        id: country.id,
        name: country.name,
        number: country.locations.length
      }
    });
    countriesByNumber.forEach(country => {
      if(country.number > max){
        max = country.number;
      }
    });

    return countriesByNumber.filter(country => country.number === max);
  }

  getMostVisitedContinentsByLocation() {
    let max = 0;
    const continentsByNumber = this.props.currentUserQuery.user.continents.map(continent => {
      return {
        id: continent.id,
        name: continent.name,
        number: continent.locations.length
      }
    });
    continentsByNumber.forEach(continent => {
      if(continent.number > max){
        max = continent.number;
      }
    });

    return continentsByNumber.filter(continent => continent.number === max);
  }

  getMostVisitedContinentsByCountry() {
    let max = 0;
    const continentsByNumber = this.props.currentUserQuery.user.continents.map(continent => {
      return {
        id: continent.id,
        name: continent.name,
        number: continent.countries.length
      }
    });
    continentsByNumber.forEach(continent => {
      if(continent.number > max){
        max = continent.number;
      }
    });

    return continentsByNumber.filter(continent => continent.number === max);
  }

  getMostTraveledYearByLocation() {
    let results = [];
    this.props.currentUserQuery.user.locations.forEach(location => {
      const found = results.find(element => {
        return element.name === location.yearVisited
      });
      if(!found) {
        results.push({
          id: location.id,
          name: location.yearVisited,
          number: 1
        });
      } else {
        found.number++;
      }
    });
    let max = 0;
    results.forEach(result => {
      if(result.number > max){
        max = result.number;
      }
    });
    return results.filter(result => result.number === max);
  }

  getMostTraveledYearByCountry() {
    let results = [];
    this.props.currentUserQuery.user.locations.forEach(location => {
      const found = results.find(element => {
        return element.name === location.yearVisited
      });
      if(!found) {
        results.push({
          id: location.id,
          name: location.yearVisited,
          countries: [location.country.name],
          number: 1
        });
      } else {
        
        if(!found.countries.includes(location.country.name)){
          found.countries.push(location.country.name);
          found.number++;
        }
      }
    });
    let max = 0;
    results.forEach(result => {
      if(result.number > max){
        max = result.number;
      }
    });
    return results.filter(result => result.number === max);
  }

  getCountriesRanked() {
    
    const result = this.props.currentUserQuery.user.countries.map(country => {
      return {
        id: country.id,
        name: country.name,
        number: country.locations.length,
        numberOfLocations: country.locations.length
      }
    }).sort(compareByNumberOfLocations);
    return result;
  }

  getContinentsRankedByLocation() {
    const result = this.props.currentUserQuery.user.continents.map(continent => {
      return {
        id: continent.id,
        name: continent.name,
        number: continent.locations.length,
      }
    }).sort(compareByArrayLength);
    return result;
  }

  getContinentsRankedByCountry() {
    const result = this.props.currentUserQuery.user.continents.map(continent => {
      return {
        id: continent.id,
        name: continent.name,
        number: continent.countries.length,
      }
    }).sort(compareByArrayLength);
    return result;
  }


  render() {
    if(this.props.currentUserQuery.loading || this.props.usersQuery.loading) {
      return null;
    }
    const {continents, countries, locations} = this.props.currentUserQuery.user;
    return (
      <div>
        <Flip top>
          <div className="row">
            <div className="col s4">
              <InfoCard
                title="Continents"
                header={this.getTotalContinents()}
                subHeader="Ranked # "
                subHeaderOptions={this.getContinentRanking()}
              />
            </div>
            <div className="col s4">
              <InfoCard
                title="Countries"
                header={this.getTotalCountries()}
                subHeader="Ranked # "
                subHeaderOptions={this.getCountryRanking()}
              />
            </div>
            <div className="col s4">
              <InfoCard
                title="Locations"
                header={this.getTotalLocations()}
                subHeader="Ranked # "
                subHeaderOptions={this.getLocationRanking()}
              />
            </div> 
          </div>
        </Flip>
        {continents.length === 0 &&
          <Fade clear>
            <div className="margin-bottom-large">
              <div className="statistics-row-container">
                <p className="bold medium-text">
                  You have no continents
                </p>
                <div className="medium-text">
                  To add a new continent, follow these steps:<br/><br/>
                  <b>1 - </b>Select the "Manager" tab<br/>
                  <b>2 - </b>Add your continent by pressing the "Add continent" button<br/>
                </div>
              </div>
            </div>
          </Fade>
        }
        {countries.length === 0 &&
          <Fade clear>
            <div className="margin-bottom-large">
              <div className="statistics-row-container">
                <p className="bold medium-text">
                  You have no countries
                </p>
                <div className="medium-text">
                  To add a new country, follow these steps:<br/><br/>
                  <b>1 - </b>Select the "Manager" tab<br/>
                  <b>2 - </b>If your country has no continent, add your country's continent<br/>
                    by pressing the "Add continent" button<br/>
                  <b>3 - </b>Add your country by pressing the "Add country" button.<br/>
                  You can either use the continent you just created or select an already existing continent<br/>
                </div>
              </div>
            </div>
          </Fade>
        }
        {locations.length === 0 &&
          <Fade clear>
            <div className="margin-bottom-large">
              <div className="statistics-row-container">
                <p className="bold medium-text">
                  You have no locations
                </p>
                <div className="medium-text">
                  To add a new country, follow these steps:<br/><br/>
                  <b>1 - </b>Select the "Manager" tab<br/>
                  <b>2 - </b>If you have no continents and no countries, add your country's continent<br/>
                    by pressing the "Add continent" button<br/>
                  <b>3 - </b>Add your location's country by pressing the "Add country" button.<br/>
                  You can either use the continent you just created or select an already existing continent<br/>
                  <b>3 - </b>Add your location by pressing the "Add location" button.<br/>
                  You can either use the continent you just created or select an already existing continent<br/>
                </div>
              </div>
            </div>
          </Fade>
        }
        {countries.length > 0 &&
          <Fade top>
            <StatisticsRow
              type="country"
              title="Most visited country"
              byType="Locations"
              data={this.getMostVisitedCountries()}
            />
          </Fade>
        }
        {continents.length > 0 &&
          <div>
            <Fade top>
              <StatisticsRow
                type="continent"
                title="Most visited continent (by locations)"
                byType="Locations"
                data={this.getMostVisitedContinentsByLocation()}
              />
            </Fade>
            <Fade top>
              <StatisticsRow
                type="continent"
                title="Most visited continent (by countries)"
                byType="Countries"
                data={this.getMostVisitedContinentsByCountry()}
              />
            </Fade>
          </div>
        }
        {locations.length > 0 &&
          <Fade top>
            <StatisticsRow
              type="location"
              title="Most traveled year (by locations)"
              byType="Locations"
              data={this.getMostTraveledYearByLocation()}
            />
          </Fade>
        }
        {locations.length > 0 &&
          <Fade top>
            <StatisticsRow
              type="country"
              title="Most traveled year (by countries)"
              byType="Countries"
              data={this.getMostTraveledYearByCountry()}
            />
        </Fade>
        }
        {countries.length > 0 &&
          <Fade left>
            <div className="margin-top-medium">
              <UnitsByUserTable
                label="Countries ranked by location"
                emptyLabel="You have no countries yet"
                units={this.getCountriesRanked()}
                sorted
                onUpdate={() => this.props.data.refetch()}
              />
            </div>
          </Fade>
        }
        {continents.length > 0 &&
          <div>
            <Fade left>
              <div className="margin-top-medium">
                <UnitsByUserTable
                  label="Continents ranked by location"
                  emptyLabel="You have no continents yet"
                  units={this.getContinentsRankedByLocation()}
                  sorted
                  onUpdate={() => this.props.data.refetch()}
                />
              </div>
            </Fade>
            <Fade left>
              <div className="margin-top-medium">
                <UnitsByUserTable
                  label="Continents ranked by country"
                  emptyLabel="You have no continents yet"
                  units={this.getContinentsRankedByCountry()}
                  sorted
                  onUpdate={() => this.props.data.refetch()}
                />
              </div>
            </Fade>
          </div>
        }
      </div>
    );
  }
}

export default graphql(UsersQuery, {name: 'usersQuery'})(
  graphql(CurrentUserQuery, {name: 'currentUserQuery'})(DashboardOverview)
  );