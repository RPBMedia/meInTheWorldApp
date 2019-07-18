import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import AddContinentMutation from '../mutations/AddContinent';
import { hashHistory } from 'react-router';

class AddContinent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
    };
  }

  onSubmit() {
    console.log('Creating new continent: ', this.state.name);
    debugger;
    this.props.mutate({
      variables: {
        name: this.state.name,
        userId: this.props.data.user.id
      },
      refetchQueries: [{ query: CurrentUserQuery }]
    })
    .then(() => hashHistory.push('/dashboard'))
    // .catch(res => {
    //   let errors = null;
    //   if(res.graphQLErrors && res.graphQLErrors.length > 0){
    //     errors = res.graphQLErrors.map(error => error.message);
    //     this.setState({
    //       errors,
    //     });
    //   }
    //  });
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
          <button
            onClick={this.onSubmit.bind(this)} className="btn">
            Create Continent
          </button>
        </form>
      </div>
    );
  }
}

export default graphql(AddContinentMutation)(AddContinent);