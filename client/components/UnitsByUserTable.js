import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compareByName } from '../utils';
import UnitRow from './UnitRow';

class UnitsByUserTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      minimized: true
    };
  }

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
        {this.state.minimized && 
          <div>
            <i
              className="left small clickable material-icons"
              onClick={() => this.setState({
                minimized: false
              })}
            >
              arrow_drop_down
            </i>
            <ul className="collection">
              <UnitRow
                editable={this.props.editable}
                key={this.props.units[0].id}
                unit={this.props.units[0]}
                onUpdate={() => this.onRowUpdate(this.props.units[0])}
              />
            </ul>
          </div>
        }
        {this.state.minimized === false &&
          <div>
            <i
              className="left small clickable material-icons"
              onClick={() => this.setState({
                minimized: true
              })}
            >
              arrow_drop_up
            </i>
            <ul className="collection">
              {this.renderUnitList()}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default UnitsByUserTable;