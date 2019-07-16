import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import CurrentUserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/Logout';

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
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/register">
              Register
            </Link>
          </li>
          <li>
          <Link to="/login">
            Login
          </Link>
          </li>
        </div>
      )
    }
  }

  render() {
    return (
            <nav>
              <div className="container nav-wrapper">
                <Link to="/" className="brand-logo left">
                  Home
                </Link>
                <ul className="right">
                  {this.renderButtons()}
                </ul>
              </div>
            </nav>
    );
  }
}

export default graphql(LogoutMutation)(
  graphql(CurrentUserQuery)(Header)
);
