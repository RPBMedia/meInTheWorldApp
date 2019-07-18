import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
// import LocationsByUser from '../components/LocationsByUser';
import CurrentUserQuery from '../queries/CurrentUser';
import ContinentsByUserTable from '../components/ContinentsByUserTable';


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
  }

  goToAddLocation() {
    console.log("Add locations clicked");
  }

  renderAddButtons() {
    return (
      <div className="flex">
        <button className="btn cell" onClick={() => this.goToAddContinent()}>
          Add Continent
        </button>
        <button className="btn cell" onClick={() => this.goToAddContinent()}>
          Add Continent
        </button>
        <button className="btn cell" onClick={() => this.goToAddContinent()}>
          Add Continent
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
        <h4 className="center margin-bottom-large">
          Welcome {this.props.data.user.name}
        </h4>
        <div className="container nav-wrapper button-nav">
          {this.renderAddButtons()}
        </div>
        <p>
          Your continents
        </p>
        <ContinentsByUserTable continents={this.props.data.user.continents} />
        <p>
          Your countries
        </p>
        <p>
          Your locations
        </p>
        {/* <LocationsByUser userId={this.props.data.user.id} /> */}
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(Dashboard);