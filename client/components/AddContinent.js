import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddContinentMutation from '../mutations/AddContinent';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';
import BackButton from './BackButton';
import {
  setErrors,
  renderButtonClassesByObject,
  toTitleCase,
} from '../utils';
import Fade from 'react-reveal/Fade';
import { continents as continentsOptions } from '../data/continents';

class AddContinent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errors: [],
      successMessage: null,
      addAnother: false,
      selectedContinent: null,
    };
  }

  onSubmit(event) {
    console.log('Creating new continent: ', this.state.selectedContinent.label);
    event.preventDefault();
    this.setState({errors: []});
    if(this.state.addAnother) {
      this.setState({
        selectedContinent: null,
      })
    }
    if(!this.props.data.user) {
      this.setState({errors: [
        'User not found. Please logout and log back in',
      ]});
    } else {
      this.props.mutate({
        variables: {
          name: toTitleCase(this.state.selectedContinent.label),
          userId: this.props.data.user.id
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .then(() => {
        if(this.state.addAnother === false) {
          hashHistory.push('/dashboard/manager');
        } else {
          this.setState({
            successMessage: 'Continent created successfully'
          });
          setTimeout(() => {
            this.setState({
              successMessage: null,
            })
          }, 2000);
        }
      })
      .catch(res => {
        const errors = setErrors(res);
        this.setState({
          errors,
        });
       });
    }
  }

  toggleAddAnother(event) {
    this.setState({
      addAnother: event.target.checked
    }, () => {
      console.log('Checked: ', this.state.addAnother)
    })
    
  }

  render() {
    return (
      <div className="row margin-top-large">
        <div className="left"> 
          <BackButton to="dashboard/manager"/>
        </div>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          <div className="input-field margin-bottom-small">
            <Select
              // className="select"
              placeholder="Select the continent name"
              value={this.state.selectedContinent}
              options={continentsOptions}
              onChange={selectedContinent => {
                console.log(selectedContinent);
                this.setState({selectedContinent}); 
              }}
            />
          </div>
          <div className="margin-bottom-small">
            <CheckBox
              checked={this.state.addAnother}
              onChange={this.toggleAddAnother.bind(this)}
              />
          </div>    
          <button
            className={renderButtonClassesByObject(this.state.selectedContinent)}
            onClick={this.onSubmit.bind(this)}>
            Create Continent
          </button>
          <Fade top when={this.state.successMessage}>
            <div className="success margin-top-small">
              {this.state.successMessage}
            </div>
          </Fade> 
          <Fade top when={this.state.errors && this.state.errors.length > 0}>
            <div className="errors margin-top-small"  >
              {this.state.errors.map(error => <div key={error}>{error}</div> )}
            </div>
          </Fade>
        </form>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(
  graphql(AddContinentMutation)(AddContinent)
);