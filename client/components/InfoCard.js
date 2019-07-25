import React, { Component } from 'react';

class InfoCard extends Component {
  render() {
    const {title, header, subHeader, subHeaderOptions} = this.props;
    return (
      <div className="info-card-container">
        <div className="bold large-text">{title}</div>
        <div className="super-large-text">{header}</div>
        <div>
          <span className="italic small-text">
            {subHeader}
          </span>
          <span className="bold medium-text">
            {subHeaderOptions}
          </span>
        </div>
      </div>
    );
  }
}

export default InfoCard;