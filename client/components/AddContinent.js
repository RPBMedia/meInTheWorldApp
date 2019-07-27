import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import AddContinentMutation from '../mutations/AddContinent';
import { hashHistory } from 'react-router';
import CheckBox from './CheckBox';
import BackButton from './BackButton';
import { renderButtonClassesByStringProperty } from '../utils';

class AddContinent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      errors: [],
      addAnother: false,
    };
  }

  onSubmit(event) {
    console.log('Creating new continent: ', this.state.name);
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
          userId: this.props.data.user.id
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
          <div className="margin-bottom-small">
            <CheckBox
              checked={this.state.addAnother}
              onChange={this.toggleAddAnother.bind(this)}
            />
          </div>    
          <button
            className={renderButtonClassesByStringProperty(this.state.name)}
            onClick={this.onSubmit.bind(this)}>
            Create Continent
          </button>
        </form>
      </div>
    );
  }
}

export default graphql(CurrentUserQuery)(
  graphql(AddContinentMutation)(AddContinent)
);