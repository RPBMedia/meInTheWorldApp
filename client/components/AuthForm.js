import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
    })
  }
  

  render() {
    return (
      <div className="row margin-top-large">
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          {this.props.register &&
            <div className="input-field">
              <input
                placeholder="Name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
          }
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          {this.props.register &&
            <div className="input-field">
              <input
                placeholder="Confirm password"
                type="password"
                value={this.state.confirmPassword}
                onChange={e => this.setState({ confirmPassword: e.target.value })}
              />
            </div>
          }
          <button
            onClick={this.onSubmit.bind(this)} className="btn">
            {this.props.register ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    );
  }
}

export default AuthForm;