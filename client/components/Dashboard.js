import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
// import LocationsByUser from '../components/LocationsByUser';
import CurrentUserQuery from '../queries/CurrentUser';
import UnitsByUserTable from '../components/UnitsByUserTable';


class Dashboard extends Component {

  goToAddContinent() {
    console.log("Add continent clicked");
    hashHistory.push({
      pathname: '/continents/add',
      state: { user: this.props.data.user }
    });
  }

  goToAddCountry() {
    console.log("Add country clicked");
    console.log("Add continent clicked");
    hashHistory.push({
      pathname: '/countries/add',
      state: { user: this.props.data.user }
    });
  }

  goToAddLocation() {
    console.log("Add locations clicked");
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
          Add Continent
        </button>
        <button
          className={this.renderButtonClasses(continents)}
          disabled={!continents || (continents && continents.length === 0)}
          onClick={() => this.goToAddCountry()}
        >
          Add Country
        </button>
        <button
          className={this.renderButtonClasses(countries)}
          disabled={!countries || (countries && countries.length === 0)}
          onClick={() => this.goToAddContinent()}
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
    debugger;
    this.props
    return (
      <div>
        <h4 className="center margin-bottom-large">
          Welcome {this.props.data.user.name}
        </h4>
        <div className="container nav-wrapper button-nav">
          {this.renderAddButtons()}
        </div>
        <p>
          Your continents
        </p>
        <UnitsByUserTable
          label="Total continents: "
          emptyLabel="You have no continents yet"
          units={this.props.data.user.continents}
        />
        <p>
          Your countries
        </p>
        <UnitsByUserTable
          label="Total countries: "
          emptyLabel="You have no countries yet"
          units={this.props.data.user.countries}
        />
        <p>
          Your locations
        </p>
        {/* <LocationsByUser userId={this.props.data.user.id} /> */}
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(Dashboard);