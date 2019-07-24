import React, { Component } from 'react';

class CheckBox extends Component {
  render() {
    return (
      <div className="switch">
        <label>
          <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
          <span className="lever" />
          Add Another
        </label>
      </div>
    );
  }
}

export default CheckBox;