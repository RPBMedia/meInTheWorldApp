import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import BackButton from './BackButton';
import { graphql } from 'react-apollo';
import {hashHistory} from 'react-router';
import CurrentUserQuery from '../queries/CurrentUser';
import Loader from 'react-loader-spinner';
import EditUserProfileMutation from '../mutations/EditUserProfile';
import {
  setErrors,
  toTitleCase,
} from '../utils';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      errors: [],
    };
  }

  onSubmit() {
    console.log('Updating profile: ', this.state);
    event.preventDefault();
    this.setState({errors: []});
    if(!this.props.data.user) {
      this.setState({errors: [
        'User not found. Please logout and log back in',
      ]});
    } else if(this.state.name.trim().length === 0 ||
    this.state.email.trim().length === 0) {
      this.setState({errors: [
        'Name and email can not be empty',
      ]});
    }else {
      this.props.mutate({
        variables: {
          id: this.props.data.user.id,
          name: toTitleCase(this.state.name),
          email: this.state.email,
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .then(() => {
        hashHistory.push('/profile/view');
      })
      .catch(res => {
        const errors = setErrors(res);
        this.setState({
          errors,
        });
       });
    }
  } 

  render() {
    if(this.props.data.loading) {
      return (
        <div className="row center margin-top-large">
          <Loader
            type="Oval"
            color="#26a69a"
            height="60"	
            width="60"
          />
        </div>
      );
    }
    const {name, email} = this.props.data.user;
    return (
      <div>
        <Zoom clear>
          <h4 className="center margin-top-medium margin-bottom-large">
            Edit Profile
          </h4>
        </Zoom>
        <div className="left"> 
          <BackButton to="profile/view"/>
        </div>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          <div className="input-field">
            <input
              placeholder={this.props.data.user.name || ''}
              value={this.state.name || ''}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder={this.props.data.user.email || ''}
              value={this.state.email || ''}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <Fade top when={this.state.errors && this.state.errors.length > 0}>
            <div className="errors margin-top-small"  >
              {this.state.errors.map(error => <div key={error}>{error}</div> )}
            </div>
          </Fade>
        </form>
        <button
          className="btn cell"
          onClick={this.onSubmit.bind(this)}
        >
          Update profile
        </button>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(
  graphql(EditUserProfileMutation)(ProfileEdit)
);