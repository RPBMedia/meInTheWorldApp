import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          className="input"
          placeholder="Filter locations by any criteria"
          onChange={this.props.onUpdate}
        />
      </div>
    );
  }
}

export default SearchBar;