import React, { Component } from 'react';

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
    const {title, data } = this.props;
    return (
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
    );
  }
}

export default StatisticsRow;