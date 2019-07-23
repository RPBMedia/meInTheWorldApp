import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
// import LocationsByUser from '../components/LocationsByUser';
import CurrentUserQuery from '../queries/CurrentUser';
import UnitsByUserTable from '../components/UnitsByUserTable';


class Dashboard extends Component {

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
  render() {
    if(this.props.data.loading) {
      return null
    }
    return (
      <div>
        <div className="container nav-wrapper button-nav">
          {this.renderAddButtons()}
        </div>
        <p className="section-header">
          Your continents
        </p>
        <UnitsByUserTable
          label="Total continents: "
          emptyLabel="You have no continents yet"
          units={this.props.data.user.continents}
        />
        <p className="section-header">
          Your countries
        </p>
        <UnitsByUserTable
          label="Total countries: "
          emptyLabel="You have no countries yet"
          units={this.props.data.user.countries}
        />
        <p className="section-header">
          Your locations
        </p>
        <UnitsByUserTable
          label="Total locations: "
          emptyLabel="You have no locations yet"
          units={this.props.data.user.locations}
        />
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(Dashboard);