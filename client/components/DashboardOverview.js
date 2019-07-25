import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';
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

class DashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalContinents: null,
      totalCountries: null,
      totalLocations: null,
    }
  }

  renderAddButtons() {
    const { continents, countries } = this.props.data.user;
    return (
      <div className="flex">
        <button className="btn cell" onClick={() => this.goToAddContinent()}>
          Create Continent
        </button>
        <button
          className={this.renderButtonClasses(continents)}
          disabled={!continents || (continents && continents.length === 0)}
          onClick={() => this.goToAddCountry()}
        >
          Create Country
        </button>
        <button
          className={this.renderButtonClasses(countries)}
          disabled={!countries || (countries && countries.length === 0)}
          onClick={() => this.goToAddLocation()}
        >
          Create Location
        </button>
      </div>
    )
  }

  goToAddContinent() {
    hashHistory.push({
      pathname: '/continents/add',
      state: { user: this.props.data.user }
    });
  }

  goToAddCountry() {
    hashHistory.push({
      pathname: '/countries/add',
      state: { user: this.props.data.user }
    });
  }

  goToAddLocation() {
    hashHistory.push({
      pathname: '/locations/add',
      state: { user: this.props.data.user }
    });
  }

  renderButtonClasses(setOfData) {
    if(!setOfData || (setOfData && setOfData.length === 0)) {
      return 'btn cell disabled';
    }
    return 'btn cell';
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
    return (
      <div>
        <div className="container nav-wrapper button-nav">
          {this.renderAddButtons()}
        </div>
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
        <div className="margin-top-medium">
          <UnitsByUserTable
            label="Countries ranked by location"
            emptyLabel="You have no countries yet"
            units={this.getCountriesRanked()}
            sorted
            onUpdate={() => this.props.data.refetch()}
          />
        </div>
        <div className="margin-top-medium">
          <UnitsByUserTable
            label="Continents ranked by location"
            emptyLabel="You have no continents yet"
            units={this.getContinentsRankedByLocation()}
            sorted
            onUpdate={() => this.props.data.refetch()}
          />
        </div>
        <div className="margin-top-medium">
          <UnitsByUserTable
            label="Continents ranked by country"
            emptyLabel="You have no continents yet"
            units={this.getContinentsRankedByCountry()}
            sorted
            onUpdate={() => this.props.data.refetch()}
          />
        </div>
      </div>
    );
  }
}

export default graphql(UsersQuery, {name: 'usersQuery'})(
  graphql(CurrentUserQuery, {name: 'currentUserQuery'})(DashboardOverview)
  );