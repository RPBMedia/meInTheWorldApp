import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import SearchBar from './SearchBar';
import {
  compareByName,
  compareByNameReverse,
  compareByContinentName,
  compareByContinentNameReverse,
  compareByCountryName,
  compareByCountryNameReverse,
  compareByYearVisited,
  compareByYearVisitedReverse
 } from '../utils';

class DashboardLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingField: 'name',
      ascendingSortOrder: true,
      filteredSortedLocations: props.data.user.locations.slice()
    }
  }

  changeSortField(field){
    console.log('Sort field is now: ', field);
    let newAscendingSortOrder = true;
    // debugger;
    if(field === this.state.sortingField){
      newAscendingSortOrder = !this.state.ascendingSortOrder;
    }
    this.setState({
      sortingField: field,
      ascendingSortOrder: newAscendingSortOrder,
    });
    this.sortLocations();
  }

  sortLocations() {
    switch(this.state.sortingField) {
      case 'name':
        this.state.filteredSortedLocations.sort(this.state.ascendingSortOrder ? compareByName : compareByNameReverse);
        break;
      case 'country':
        this.state.filteredSortedLocations.sort(this.state.ascendingSortOrder ? compareByCountryName : compareByCountryNameReverse);
        break;
      case 'continent':
        this.state.filteredSortedLocations.sort(this.state.ascendingSortOrder ? compareByContinentName : compareByContinentNameReverse);
        break;
      case 'yearVisited':
        this.state.filteredSortedLocations.sort(this.state.ascendingSortOrder ? compareByYearVisited : compareByYearVisitedReverse);
        break;
      default:
        this.state.filteredSortedLocations.sort(compareByName);
        break;
    }
  }

  onUpdateFilter() {

  }

  render() {
    if(this.props.data.loading) {
      return null;
    }
    
    return (
      <div>
        Locations
        <SearchBar onUpdate={this.onUpdateFilter.bind(this)} />
        <div>
          <ul className="collection full-width">
            <li className="collection-item-row flex space-around">
              <div
                className="center-text quarter-width table-header no-border clickable"
                onClick={() => this.changeSortField('name')}
              >
                Name
              </div>
              <div
                className="center-text quarter-width table-header no-border clickable"
                onClick={() => this.changeSortField('country')}
              >
                Country
              </div>
              <div
                className="center-text quarter-width table-header no-border clickable"
                onClick={() => this.changeSortField('continent')}
              >
                Continent
              </div>
              <div
                className="center-text quarter-width table-header no-border clickable"
                onClick={() => this.changeSortField('yearVisited')}
              >
                Year
              </div>
            </li>
          </ul>
          <ul className="collection full-width">
            {this.state.filteredSortedLocations.map(location => (
              <li
                className="collection-item flex"
                key={location.id}
              >
                <div className="center-text quarter-width">
                  {location.name}
                </div>
                <div className="center-text quarter-width">
                  {location.country.name}
                </div>
                <div className="center-text quarter-width">
                {location.continent.name}
                </div>
                <div className="center-text quarter-width">
                {location.yearVisited}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardLocations);