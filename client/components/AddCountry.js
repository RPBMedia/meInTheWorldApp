import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import CurrentUserQuery from '../queries/CurrentUser';
import AddCountryMutation from '../mutations/AddCountry';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';
import { renderButtonClassesByProperties } from '../utils'

class AddCountry extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      selectedContinent: null,
      errors: [],
      addAnother: false,
    };
  }

  onSubmit(event) {
    console.log('Creating new country: ', this.state);
    event.preventDefault();
    this.setState({errors: []});
    if(this.state.addAnother) {
      this.setState({
        name: '',
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
          continentId: this.state.selectedContinent.value
        },
        refetchQueries: [{ query: CurrentUserQuery }]
      })
      .then(() => {
        if(this.state.addAnother === false) {
          hashHistory.push('/dashboard/manager');
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
      continentsOptions = continents.map(continent => {
        return {
          value: continent.id,
          label: continent.name
        }
      })
    }
    const { selectedContinent } = this.state
    return (
      <div className="row margin-top-large">
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          <div className="input-field">
            {continents && 
              <Select
                // className="select"
                placeholder="Select the country's continent"
                value={selectedContinent}
                options={continentsOptions}
                onChange={selectedContinent => {
                  console.log(selectedContinent);
                  this.setState({selectedContinent});
                  console.log(this.state);
                }}
              />
            }
          </div>
          <div className="input-field">
            <input
              placeholder="Country Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
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
            className={renderButtonClassesByProperties([this.state.name, this.state.selectedContinent])}
            onClick={this.onSubmit.bind(this)}
          >
            Create Country
          </button>
        </form>
      </div>
    );
  }
}

export default graphql(
  CurrentUserQuery
)(graphql(AddCountryMutation)(AddCountry)
);