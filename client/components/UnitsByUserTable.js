import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compareByName } from '../utils';
import UnitRow from './UnitRow';

class UnitsByUserTable extends Component {

  onRowUpdate() {
    this.props.onUpdate();
  }

  renderUnitList() {
    const sortedUnits = this.props.sorted ? this.props.units : this.props.units.slice().sort(compareByName);
    return sortedUnits.map(unit => {
      return (
        <UnitRow
          editable={this.props.editable}
          key={unit.id}
          unit={unit}
          onUpdate={() => this.onRowUpdate(unit)}
        />
      )
    })
  }
  render() {
    const {label, emptyLabel} = this.props;
    if(!this.props.units ||(this.props.units && this.props.units.length === 0)) {
      return (
        <div>
          {emptyLabel}
        </div>
      )
    }
    return (
      <div>
        <div>
          <b>{label}</b> {this.props.units.length}
        </div>
        <ul className="collection">
          {this.renderUnitList()}
        </ul>
      </div>
    );
  }
}

export default UnitsByUserTable;