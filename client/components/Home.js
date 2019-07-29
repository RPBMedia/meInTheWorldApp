import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Users from '../queries/Users';
import {
  compareByName,
  compareByNameReverse,
  compareByNumberOfUserContinents,
  compareByNumberOfUserContinentsReverse,
  compareByNumberOfUserCountries,
  compareByNumberOfUserCountriesReverse,
  compareByNumberOfUserLocations,
  compareByNumberOfUserLocationsReverse,
 } from '../utils';
 import Fade from 'react-reveal/Fade';
 import Zoom from 'react-reveal/Zoom';

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
  
    const list = this.state.sortedList ? this.state.sortedList : this.props.data.users.slice().sort(compareByName); 
    return list.map(user => {
      return (
        <li key={user.id} className="collection-item flex full-width">
          <div className="center-text quarter-width">
            {user.name}
          </div>
          <div className="center-text quarter-width">
            {user.continents.length}
          </div>
          <div className="center-text quarter-width">
            {user.countries.length}
          </div>
          <div className="center-text quarter-width">
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
    }, () => {
      this.setState({
        sortedList: this.sortUsers()
      });
    });
  }

  sortUsers() {
    switch(this.state.sortingField) {
      case 'name':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByName : compareByNameReverse);
      case 'continents':
        return this.props.data.users.slice().sort(this.state.ascendingSortOrder ? compareByNumberOfUserContinents : compareByNumberOfUserContinentsReverse);
      case 'countries':
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
        <Zoom clear>
          <h2 className="center">
            Me In The World
          </h2>
          <h4 className="center margin-bottom-large">
            My travel locations manager
          </h4>
          </Zoom>
        <div>
          <Fade top>
            <p className="center table-title">
              Registered Users
            </p>
          </Fade>
          {
            this.props.data.users && this.props.data.users.length === 0 &&
            <Fade top>
              <p className="center">
                There are no registered users yet
              </p>
            </Fade>
          }
          {this.props.data.users && this.props.data.users.length > 0 &&
          <Fade left>
            <div>
              <ul className="collection full-width">
                <li className="collection-item flex full-width">
                  <div
                    className="center-text quarter-width table-header no-border clickable"
                    onClick={() => this.changeSortField('name')}
                  >
                    Name
                  </div>
                  <div
                    className="center-text quarter-width table-header no-border clickable"
                    onClick={() => this.changeSortField('continents')}
                  >
                    Continents
                  </div>
                  <div
                    className="center-text quarter-width table-header no-border clickable"
                    onClick={() => this.changeSortField('countries')}
                  >
                    Countries
                  </div>
                  <div
                    className="center-text quarter-width table-header no-border clickable"
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
          </Fade>
          }
        </div>
      </div>
    );
  }
}

export default graphql(Users)(Home);