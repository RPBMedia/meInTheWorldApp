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
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

class DashboardLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingField: 'name',
      ascendingSortOrder: true,
      filteredSortedLocations: props.data.user.locations
    }
  }

  changeSortField(field){
    console.log('Sort field is now: ', field);
    let newAscendingSortOrder = true;
    if(field === this.state.sortingField){
      newAscendingSortOrder = !this.state.ascendingSortOrder;
    }
    this.setState({
      sortingField: field,
      ascendingSortOrder: newAscendingSortOrder,
      filteredSortedLocations: this.sortLocations()
    });
  }

  sortLocations() {
    switch(this.state.sortingField) {
      case 'name':
        return this.state.filteredSortedLocations.slice().sort(this.state.ascendingSortOrder ? compareByName : compareByNameReverse);
      case 'country':
        return this.state.filteredSortedLocations.slice().sort(this.state.ascendingSortOrder ? compareByCountryName : compareByCountryNameReverse);
      case 'continent':
        return this.state.filteredSortedLocations.slice().sort(this.state.ascendingSortOrder ? compareByContinentName : compareByContinentNameReverse);
      case 'yearVisited':
        return this.state.filteredSortedLocations.slice().sort(this.state.ascendingSortOrder ? compareByYearVisited : compareByYearVisitedReverse);
      default:
        return this.state.filteredSortedLocations.slice().sort(compareByName);
    }
  }

  onUpdateFilter(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.filteredSortedLocations;
      newList = currentList.filter(item => {
        const { name, continent, country, yearVisited } = item;
        const lcName = name.toLowerCase();
        const lcContinentName = continent.name.toLowerCase();
        const lcCountryName = country.name.toLowerCase();
        const lcYearVisited = yearVisited.toLowerCase();
        const filter = e.target.value.toLowerCase();

        const result = (lcName.includes(filter) ||
        lcContinentName.includes(filter) ||
        lcCountryName.includes(filter) ||
        lcYearVisited.includes(filter));
        return result;
      });
    } else {
      newList = this.props.data.user.locations;
    }
    this.setState({
      filteredSortedLocations: newList
    });
  }

  render() {
    if(this.props.data.loading) {
      return null;
    }
    
    return (
      <div>
        <Flip top>
          <SearchBar onUpdate={this.onUpdateFilter.bind(this)} />
        </Flip>
        <Fade top>
          <div className="flex row">
            <div className="left margin-right-small total-label">
              Total:
            </div>
            <div> 
              <div className="left medium-text">
                <b>{this.state.filteredSortedLocations.length}</b>
              </div>
            </div>
          </div>
        </Fade>
        <Fade left>
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
        </Fade>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(DashboardLocations);