import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddLocationMutation from '../mutations/AddLocation';
import { hashHistory } from 'react-router';
import ContinentsByUser from '../queries/ContinentsByUser';

class AddLocation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      yearVisited: '',
      pictureUrl: '',
      selectedContinent: null,
      selectedCountry: null,
      errors: []
    };
  }

  onSubmit(event) {
    console.log('Creating new location: ', this.state);
    event.preventDefault();
    this.setState({errors: []});
    // $name: String,
    // $userId: ID,
    // $continentId: ID,
    // $countryId: ID,
    // $yearVisited,
    // $pictureUrl,
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
    .then(() => hashHistory.push('/dashboard'))
    .catch(res => {
      const errors = utils.setErrors(res);
      this.setState({
        errors,
      });
     });
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
    if(countries) {
      countriesOptions = countries.map(country => {
        return {
          value: country.id,
          label: country.name
        }
      })
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