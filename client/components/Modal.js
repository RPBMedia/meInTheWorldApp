import React, { Component } from 'react';
import { getCountryName } from '../utils'

class Modal extends Component {
  render() {
    return (
      <div className="modal-container">
        <div className="modal-header">
          <i
            className="right clickable material-icons"
            onClick={() => this.props.onClose()}
          >
            close
          </i>
        </div>
        <div className="modal-body">
          {this.props.message &&
            <span>
              {this.props.message}
            </span>
          }
          <span className="bold">
            {getCountryName(this.props.countryCode)}
          </span>
          <span>
            {this.props.message2}
          </span>
        </div>

        
        
      </div>
    );
  }
}

export default Modal;