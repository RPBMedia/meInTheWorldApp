import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddCountryMutation from '../mutations/AddCountry';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';
import BackButton from './BackButton';
import {
  renderButtonClassesByProperties,
  compareByName,
  compareByLabel,
  setErrors,
} from '../utils';
import Fade from 'react-reveal/Fade';
import { countries as countriesOptions } from '../data/countries';

class AddCountry extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedContinent: null,
      selectedCountry: null,
      errors: [],
      successMessage: null,
      addAnother: false,
    };
  }

  onSubmit(event) {
    console.log('Creating new country: ', this.state);
    event.preventDefault();
    this.setState({errors: []});
    if(this.state.addAnother) {
      this.setState({
        selectedCountry: null,
      })
    }
    if(!this.props.data.user) {
      this.setState({errors: [
        'User not found. Please logout and log back in',
      ]});
    } else {
      this.props.mutate({
        variables: {
          name: this.state.selectedCountry.label,
          userId: this.props.data.user.id,
          continentId: this.state.selectedContinent.value
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .then((res) => {
        if(this.state.addAnother === false) {
          hashHistory.push('/dashboard/manager');
        } else {
          this.setState({
            successMessage: 'Country created successfully'
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
    if(this.props.data.loading) {
      return null;
    }
    const {continents} = this.props.data.user;
    let continentsOptions = []
    if(continents) {
      continentsOptions = continents.slice().sort(compareByName).map(continent => {
        return {
          value: continent.id,
          label: continent.name
        }
      })
    }
    let countriesOptionsArray = []
    if(this.state.selectedContinent !== null) {
      countriesOptionsArray = countriesOptions.slice().sort(compareByLabel)
      .filter(country => {
        return country.continent === this.state.selectedContinent.label
      });
    }
    const { selectedContinent, selectedCountry } = this.state
    return (
      <div className="row margin-top-large">
        <div className="left"> 
          <BackButton />
        </div>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          <div className="input-field">
            {continents && 
              <Select
                placeholder="Select the country's continent"
                value={selectedContinent}
                options={continentsOptions}
                onChange={selectedContinent => {
                  this.setState({selectedContinent});
                }}
              />
            }
          </div>
          <div className="input-field margin-bottom-small">
            <Select
              isDisabled={this.state.selectedContinent === null}
              placeholder="Select the country's name"
              value={selectedCountry}
              options={countriesOptionsArray}
              onChange={selectedCountry => {
                this.setState({selectedCountry});
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
            className={renderButtonClassesByProperties([this.state.selectedContinent, this.state.selectedCountry])}
            onClick={this.onSubmit.bind(this)}
          >
            Create Country
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

export default graphql(
  CurrentUserQuery
)(graphql(AddCountryMutation)(AddCountry)
);