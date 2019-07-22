import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Users from '../queries/Users';
import CountriesByUser from '../queries/CountriesByUser';
import LocationsByUser from '../queries/LocationsByUser';

import LocationsByUserCell from './LocationsByUserCell';
import { compareByName } from '../utils';

class Home extends Component {

  renderUserList() {
    const users = null;
    if(this.props.data.loading || !this.props.data.users) {
      return null
    }
    const sortedUsers = this.props.data.users.slice().sort(compareByName);
    return sortedUsers.map(user => {
      return (
        <li key={user.id} className="collection-item row flex">
          <div className="col s4 flex">
            <div className="cell bold">
              Name:
            </div>
            <div className="cell">  
              {user.name}
            </div>
          </div>
          <div className="col s4 flex">
            <div className="cell bold">
              Email:
            </div>
            <div className="cell">
              {user.email}
            </div>
          </div>
          <div className="col s4 flex">
            <div className="cell bold">
              Locations:
            </div>
            <div className="cell">
              <LocationsByUserCell userId={user.id} />
            </div>
          </div>
        </li>
      );
    });
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
            <ul className="collection">
              {this.renderUserList()}
            </ul>
          }
          
          {/* <ContinentsByUserTable />
          <CountriesByUserTable />
          <LocationsByUserTable /> */}
        </div>
      </div>
    );
  }
}

export default graphql(Users)(Home);