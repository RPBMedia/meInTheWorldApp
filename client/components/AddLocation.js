import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddLocationMutation from '../mutations/AddLocation';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';
import BackButton from './BackButton';
import {
  renderButtonClassesByProperties,
  compareByName,
  setErrors,
} from '../utils'
import Fade from 'react-reveal/Fade';

class AddLocation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      yearVisited: '',
      pictureUrl: '',
      selectedContinent: null,
      selectedCountry: null,
      errors: [],
      addAnother: false,
    };
  }

  onSubmit(event) {
    console.log('Creating new location: ', this.state);
    event.preventDefault();
    this.setState({errors: []});
    
    if(this.state.addAnother) {
      this.setState({
        name: '',
        yearVisited: '',
        pictureUrl: '',
      })
    }
    if(!this.props.data.user) {
      this.setState({errors: [
        'User not found. Please logout and log back in',
      ]});
    } else {
      this.props.mutate({
        variables: {
          name: this.state.name,
          userId: this.props.data.user.id,
          continentId: this.state.selectedContinent.value,
          countryId: this.state.selectedCountry.value,
          yearVisited: this.state.yearVisited,
          pictureUrl: this.state.pictureUrl,
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .then(() => {
        if(this.state.addAnother === false) {
          hashHistory.push('/dashboard/manager');
        } else {
          this.setState({
            successMessage: 'Location created successfully'
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
    })
  }

  render() {
    if(this.props.data.loading) {
      return null;
    }
    const { continents, countries } = this.props.data.user;
    let continentsOptions = []
    if(continents) {
      continentsOptions = continents.slice().sort(compareByName).map(continent => {
        return {
          value: continent.id,
          label: continent.name
        }
      })
    }
    let countriesOptions = []
    if(this.state.selectedContinent !== null) {
      if(countries) {
        countriesOptions = countries.slice().sort(compareByName)
        .filter(country => {
          return country.continent.id === this.state.selectedContinent.value
        })
        .map(country => {
          return {
            value: country.id,
            label: country.name
          }
        })
      }
    }
    const { selectedContinent, selectedCountry } = this.state
    return (
      <div className="row margin-top-large full-width">
        <div> 
          <BackButton to="dashboard/manager"/>
        </div>
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="half-width center-block"
        >
          <div className="input-field">
            {continents && 
              <Select
                // className="select"
                placeholder="Select the location's continent"
                value={selectedContinent}
                options={continentsOptions}
                onChange={selectedContinent => {
                  console.log(selectedContinent);
                  this.setState({selectedContinent}); 
                }}
              />
            }
          </div>
          <div className="input-field">
            {countries && 
              <Select
                // className="select"
                isDisabled={this.state.selectedContinent === null}
                placeholder="Select the location's country"
                value={selectedCountry}
                options={countriesOptions}
                onChange={selectedCountry => {
                  console.log(selectedCountry);
                  this.setState({selectedCountry}); 
                }}
              />
            }
          </div>
          <div className="input-field">
            <input
              placeholder="Location Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              type="number"
              placeholder="Year in which the location was visited"
              value={this.state.yearVisited}
              onChange={e => this.setState({ yearVisited: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Url of an image from the location (optional)"
              value={this.state.pictureUrl}
              onChange={e => this.setState({ pictureUrl: e.target.value })}
            />
          </div>
          <div className="margin-bottom-small">
            <CheckBox
              checked={this.state.addAnother}
              onChange={this.toggleAddAnother.bind(this)}
            />
          </div>   
          <button
            className={renderButtonClassesByProperties([
              this.state.name,
              this.state.selectedContinent,
              this.state.selectedCountry,
              this.state.yearVisited,
            ])}
            onClick={this.onSubmit.bind(this)}>
            Create Location
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
)(graphql(AddLocationMutation)(AddLocation)
);