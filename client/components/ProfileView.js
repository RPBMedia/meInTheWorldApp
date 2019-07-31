import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import Loader from 'react-loader-spinner';
import {hashHistory} from 'react-router';

class ProfileView extends Component {
  goToEditProfile() {
    hashHistory.push({
      pathname: '/profile/edit',
      state: { user: this.props.data.user }
    });
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
    const {name, email} = this.props.data.user;
    return (
      <div>
        <Zoom clear>
          <h4 className="center margin-top-medium margin-bottom-large">
            Profile Settings
          </h4>
        </Zoom>
        <div className="margin-top-small">
            <ul className="collection">
              <li className="collection-item flex">
                <div className="cell col s3 bold half-width">  
                  Name
                </div>
                <div className="cell col s3">  
                  {name}
                </div>
              </li>
              <li className="collection-item flex">
                <div className="cell col s3 bold half-width">  
                  Email
                </div>
                <div className="cell col s3">  
                  {email}
                </div>
              </li>
            </ul>
            <button className="btn cell" onClick={() => this.goToEditProfile()}>
                Edit profile
            </button>
        </div>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(ProfileView);