import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import AddCountryMutation from '../mutations/AddCountry';
import { hashHistory } from 'react-router';

class AddCountry extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      errors: []
    };
  }

  onSubmit(event) {
    console.log('Creating new continent: ', this.state.name);
    event.preventDefault();
    this.setState({errors: []});
    this.props.mutate({
      variables: {
        name: this.state.name,
        userId: this.props.data.user.id
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
    return (
      <div className="row margin-top-large">
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s4 center-s4"
        >
          <div className="input-field">
            <input
              placeholder="Continent Name"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          {this.state.errors && this.state.errors.length > 0 &&
            <div className="errors padding-bottom-sides-small">
              {this.state.errors.map(error => <div key={error}>{error}</div> )}
            </div>
            
          }
          <button
            onClick={this.onSubmit.bind(this)} className="btn">
            Create Continent
          </button>
        </form>
      </div>
    );
  }
}

export default graphql(AddCountryMutation)(AddCountry);