import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddLocationMutation from '../mutations/AddLocation';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';

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
          hashHistory.push('/dashboard/overview');
        }
      })
      .catch(res => {
        const errors = utils.setErrors(res);
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
      continentsOptions = continents.map(continent => {
        return {
          value: continent.id,
          label: continent.name
        }
      })
    }
    let countriesOptions = []
    if(this.state.selectedContinent !== null) {
      if(countries) {
        countriesOptions = countries
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
      <div className="row margin-top-large">
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s6 center-s2"
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
          {this.state.errors && this.state.errors.length > 0 &&
            <div className="errors padding-bottom-sides-small">
              {this.state.errors.map(error => <div key={error}>{error}</div> )}
            </div>
            
          }
          <div className="margin-bottom-small">
            <CheckBox
              checked={this.state.addAnother}
              onChange={this.toggleAddAnother.bind(this)}
            />
          </div>   
          <button
            onClick={this.onSubmit.bind(this)} className="btn">
            Create Location
          </button>
        </form>
      </div>
    );
  }
}

export default graphql(
  CurrentUserQuery
)(graphql(AddLocationMutation)(AddLocation)
);