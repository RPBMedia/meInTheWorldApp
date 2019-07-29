import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

class StatisticsRow extends Component {
  renderData(data) {
    return data.map(unit => {
      return (
        <li key={unit.id} className="collection-item">
          <b>{unit.name}</b>: {unit.number} {this.props.byType}
        </li>
      );
    })
  }
  render() {
    const {title, data, type } = this.props;
    return (
      <Fade top>
        <div className="statistics-row-container">
          <div className="row">
            <div className="col s6">
              <p className="bold medium-text">{title}</p>
            </div>
            <div className="col s6">
              <ul className="collection">
                {this.renderData(data)}
              </ul>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default StatisticsRow;