import React, { Component } from 'react';
import { Link } from 'react-router';

class DashboardNav extends Component {
  render() {
    return (
      <nav className="white-nav">
        <div className="container nav-wrapper button-nav">
          <ul className="left hide-on-med-and-down">
            <li className={this.props.selectedTab === 0 ? 'selected-tab' : null}> 
              <Link
                to="/dashboard/overview"
                className="black-text"
                onClick={() => this.props.onChange(0)}
              >
                Overview
              </Link>
            </li>
            <li className={this.props.selectedTab === 1 ? 'selected-tab' : null}> 
              <Link
                to="/dashboard/locations"
                className="black-text"
                onClick={() => this.props.onChange(1)}
              >
                Locations
              </Link>
            </li>
            <li className={this.props.selectedTab === 2 ? 'selected-tab' : null}> 
              <Link
                to="/dashboard/statistics"
                className="black-text"
                onClick={() => this.props.onChange(2)}
              >
                Statistics
              </Link>
            </li>
            <li className={this.props.selectedTab === 3 ? 'selected-tab' : null}> 
              <Link
                to="/dashboard/map"
                className="black-text"
                onClick={() => this.props.onChange(3)}
              >
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