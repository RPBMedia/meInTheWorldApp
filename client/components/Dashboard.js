import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import DashboardNav from './DashboardNav';
import Loader from 'react-loader-spinner';
import Fade from 'react-reveal/Fade';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHeaderTab: this.getSelectedTab()
    }
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

  getSelectedTab() {
    console.log('yo: ', this.props.location.pathname);
    switch (this.props.location.pathname) {
      case '/dashboard/overview':
        return 0;
      case '/dashboard/manager':
          return 1;
      case '/dashboard/locations':
        return 2;
      case '/dashboard/map':
        return 3;
      default:
        return 0;
    }
  }

  renderButtonClasses(setOfData) {
    if(!setOfData || (setOfData && setOfData.length === 0)) {
      return 'btn cell disabled';
    }
    return 'btn cell';
  }

  onHeaderTabChange(tabNumber) {
    this.setState({
      selectedHeaderTab: tabNumber
    }, () => {
      console.log('Tab is now: ', this.state.selectedHeaderTab);
    });
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
      return (
        <div className="row center margin-top-large">
          <Loader
            type="Oval"
            color="#26a69a"
            height="60"	
            width="60"
          />
        </div>
      );
    }
    return (
      <div>
        <Fade top>
          <h4 className="center margin-vertical-medium">
            Welcome {this.props.data.user && this.props.data.user.name}
          </h4>
        </Fade>
        <Fade left>
          <DashboardNav selectedTab={this.state.selectedHeaderTab} onChange={this.onHeaderTabChange.bind(this)}/>
        </Fade>
        <div className="margin-top-small">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(Dashboard);