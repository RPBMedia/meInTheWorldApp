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
    }).sort(compareByNumberOfnLocations);

    let result = null;
    for(let i = 0; i < rankedArray.length; i++) {
      if(rankedArray[i].id === this.props.currentUserQuery.user.id) {
        result = i+1;
        break;
      }
    }
    return result;
  }

  render() {
    if(this.props.currentUserQuery.loading || this.props.usersQuery.loading) {
      return null;
    }
    return (
      <div>
        <div className="flex row">
          <div className="col s4 left">
            <InfoCard
              title="Continents"
              header={this.getTotalContinents()}
              subHeader="Ranked # "
              subHeaderOptions={this.getContinentRanking()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(UsersQuery, {name: 'usersQuery'})(
  graphql(CurrentUserQuery, {name: 'currentUserQuery'})(DashboardStatistics)
  );