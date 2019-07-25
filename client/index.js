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
import DashboardOverview from './components/DashboardOverview';
import DashboardManager from './components/DashboardManager';
import DashboardLocations from './components/DashboardLocations';
import DashboardMap from './components/DashboardMap';
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
          <Route path="dashboard" component={RequireAuth(Dashboard)}>
            <Route path="overview" component={RequireAuth(DashboardOverview)} />
            <Route path="manager" component={RequireAuth(DashboardManager)} />
            <Route path="locations" component={RequireAuth(DashboardLocations)} />
            <Route path="map" component={RequireAuth(DashboardMap)} />
          </Route>
          <Route path="continents/add" component={AddContinent} />
          <Route path="countries/add" component={AddCountry} />
          <Route path="locations/add" component={AddLocation} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
