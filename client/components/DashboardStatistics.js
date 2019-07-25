import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import UsersQuery from '../queries/Users';
import {
  compareByNumberOfContinents,
  compareByNumberOfCountries,
  compareByNumberOfLocations,
} from '../utils';
import InfoCard from './InfoCard';
import StatisticsRow from './StatisticsRow';

class DashboardStatistics extends Component {
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


  render() {
    if(this.props.currentUserQuery.loading || this.props.usersQuery.loading) {
      return null;
    }
    return (
      <div>
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
        <StatisticsRow
          title="Most visited country"
          byType="Locations"
          data={this.getMostVisitedCountries()}
        />
        <StatisticsRow
          title="Most visited continent (by locations)"
          byType="Locations"
          data={this.getMostVisitedContinentsByLocation()}
        />
        <StatisticsRow
          title="Most visited continent (by countries)"
          byType="Countries"
          data={this.getMostVisitedContinentsByCountry()}
        />
        <StatisticsRow
          title="Most traveled year (by locations)"
          byType="Locations"
          data={this.getMostTraveledYearByLocation()}
        />
        <StatisticsRow
          title="Most traveled year (by countries)"
          byType="Countries"
          data={this.getMostTraveledYearByCountry()}
        />
      </div>
    );
  }
}

export default graphql(UsersQuery, {name: 'usersQuery'})(
  graphql(CurrentUserQuery, {name: 'currentUserQuery'})(DashboardStatistics)
  );