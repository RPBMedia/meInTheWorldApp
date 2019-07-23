import React, { Component } from 'react';
import { Link } from 'react-router';

class DashboardNav extends Component {
  render() {
    return (
      <nav className="white-nav">
        <div className="container nav-wrapper button-nav">
          <ul className="left hide-on-med-and-down">
            <li>
              <Link to="/dashboard/overview" className="black-text">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/dashboard/locations" className="black-text">
                Locations
              </Link>
            </li>
            <li>
              <Link to="/dashboard/statistics" className="black-text">
                Statistics
              </Link>
            </li>
            <li>
              <Link to="/dashboard/map" className="black-text">
                World Map
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default DashboardNav;