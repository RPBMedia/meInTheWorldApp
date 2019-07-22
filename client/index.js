import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Redirect, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import AddContinent from './components/AddContinent';
import AddCountry from './components/AddCountry';
import AddLocation from './components/AddLocation';
import RequireAuth from './components/RequireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});


console.log(hashHistory.location);

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Redirect exact from="/" to="/home" />
        <Route path="/" component={App}>
          <Route path="home" component={Home} initialState/>
          <Route path="login" component={LoginForm} />
          <Route path="register" component={RegisterForm} />
          <Route path="dashboard" component={RequireAuth(Dashboard)} />
          <Route path="continents/add" component={RequireAuth(AddContinent)} />
          <Route path="countries/add" component={RequireAuth(AddCountry)} />
          <Route path="locations/add" component={RequireAuth(AddLocation)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
