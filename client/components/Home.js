import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Users from '../queries/Users';
import {
  compareByName,
  compareByNameReverse,
  compareByEmail,
  compareByEmailReverse,
  compareByNumberOfUserContinents,
  compareByNumberOfUserContinentsReverse,
  compareByNumberOfUserCountries,
  compareByNumberOfUserCountriesReverse,
  compareByNumberOfUserLocations,
  compareByNumberOfUserLocationsReverse,
 } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingField: 'name',
      ascendingSortOrder: true,
      sortedList: undefined
    }
  }

  renderUserList() {
    const users = null;
    if(this.props.data.loading || !this.props.data.users) {
      return null
    }
  
    const list = this.state.sortedList ? this.state.sortedList : this.props.data.users; 

    return list.map(user => {
      return (
        <li key={user.id} className="collection-item flex full-width">
          <div className="center-text fifth-width">
            {user.name}
          </div>
          <div className="center-text fifth-width">
            {user.email}
          </div>
          <div className="center-text fifth-width">
            {user.continents.length}
          </div>
          <div className="center-text fifth-width">
            {user.countries.length}
          </div>
          <div className="center-text fifth-width">
            {user.locations.length}
          </div>
        </li>
      );
    });
  }

  changeSortField(field){
    let newAscendingSortOrder = true;
    if(field === this.state.sortingField){
      newAscendingSortOrder = !this.state.ascendingSortOrder;
    }
    this.setState({
      sortingField: field,
      ascendingSortOrder: newAscendingSortOrder,
      sortedList: this.sortUsers()
    });
  }

  sortUsers() {
    switch(this.state.sortingField) {
      case 'name':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByName : compareByNameReverse);
      case 'email':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByEmail : compareByEmailReverse);
      case 'continents':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByNumberOfUserContinents : compareByNumberOfUserContinentsReverse);
      case 'contries':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByNumberOfUserCountries : compareByNumberOfUserCountriesReverse);
        case 'locations':
            return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByNumberOfUserLocations : compareByNumberOfUserLocationsReverse);
      default:
        return this.props.data.users.slice().sort(compareByName);
    }
  }

  render() {
    return (
      <div>
        <h2 className="center">
          Me In The World
        </h2>
        <h4 className="center margin-bottom-large">
          My travel locations manager
        </h4>
        <div>
          <p className="center table-title">
            Registered Users
          </p>
          {
            this.props.data.users && this.props.data.users.length === 0 && 
            <p className="center">
              There are no registered users yet
            </p>
          }
          {this.props.data.users && this.props.data.users.length > 0 &&
          <div>
            <ul className="collection full-width">
              <li className="collection-item flex full-width">
                <div
                  className="center-text fifth-width table-header no-border clickable"
                  onClick={() => this.changeSortField('name')}
                >
                  Name
                </div>
                <div
                  className="center-text fifth-width table-header no-border clickable"
                  onClick={() => this.changeSortField('email')}
                >
                  Email
                </div>
                <div
                  className="center-text fifth-width table-header no-border clickable"
                  onClick={() => this.changeSortField('continents')}
                >
                  Continents
                </div>
                <div
                  className="center-text fifth-width table-header no-border clickable"
                  onClick={() => this.changeSortField('countries')}
                >
                  Countries
                </div>
                <div
                  className="center-text fifth-width table-header no-border clickable"
                  onClick={() => this.changeSortField('locations')}
                >
                  Locations
                </div>
              </li>
            </ul>
            <ul className="collection full-width">
              {this.renderUserList()}
            </ul>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default graphql(Users)(Home);