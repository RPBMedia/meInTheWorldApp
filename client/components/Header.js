import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import CurrentUserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/Logout';
import Fade from 'react-reveal/Fade';

class Header extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserQuery }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data
    if (loading) {
      return <div/>;
    }
    if(user) {
      return (
        <div className="flex">
          <Link to="/profile/view">
            <i
              className="clickable material-icons"
              title="Profile"
            >
              person
            </i>
          </Link>
          <Link to="/dashboard/overview">
            <i
              className="clickable material-icons"
              title="Dashboard"
            >
              dashboard
            </i>
          </Link>
          <li>
            <a onClick={this.onLogoutClick.bind(this)}>
              <i
                className="clickable material-icons"
                title="Logout"
              >
                exit_to_app
              </i>
            </a>
          </li>
        </div>  
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/register">
              <i
                className="clickable material-icons"
                title="Register"
              >
                person_add
              </i>
            </Link>
          </li>
          <li>
          <Link to="/login">
            <i
                className="clickable material-icons"
                title="Login"
              >
                lock
              </i>
          </Link>
          </li>
        </div>
      )
    }
  }

  render() {
    return (
      <Fade top>
        <nav className="main-header">
          <div className="container nav-wrapper">
            <Link to="/home" className="brand-logo left">
              <i
                className="right clickable material-icons"
              >
                home
              </i>
            </Link>
            <ul className="right">
              {this.renderButtons()}
            </ul>
          </div>
        </nav>
      </Fade>
    );
  }
}

export default graphql(LogoutMutation)(
  graphql(CurrentUserQuery)(Header)
);
