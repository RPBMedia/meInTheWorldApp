import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal-container">
        {this.props.message}
      </div>
    );
  }
}

export default Modal;