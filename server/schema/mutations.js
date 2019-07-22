const mongoose = require('mongoose');
const graphql = require('graphql');
const AuthService = require('../services/auth');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const UserType = require('./types/user_type');
const ContinentType = require('./types/continent_type');
const CountryType = require('./types/country_type');
// const LocationType = require('./types/location_type');

const User = mongoose.model('user');
const Continent = mongoose.model('continent');
const Country = mongoose.model('country');



const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // User mutations
    signup: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, { email, password, name }, req) {
        return AuthService.signup({ email, password, name, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, { email, password }, req) {
        console.log('Back end: Login mutation triggered');
        console.log(email, password);
        return AuthService.login({ email, password, req })
      }
    },
    // Continent mutations
    addContinent: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { name, userId }) {
        console.log("Calling addContinent with params: ", name, userId);
        return User.addContinent(name, userId);
      }
    },
    // Country mutations
    addCountry: {
      type: ContinentType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
        continentId: { type: GraphQLID },
      },
      resolve(parentValue, { name, userId, continentId }) {
        console.log("Calling addCountry with params: ", name, userId, continentId);
        return Continent.addCountry(name, userId, continentId);
      }
    },
    // Location mutations
    addLocation: {
      type: CountryType,
      args: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID },
        continentId: { type: GraphQLID },
        countryId: { type: GraphQLID },
        yearVisited: { type: GraphQLString },
        pictureUrl: { type: GraphQLString },
      },
      resolve(parentValue, { name, userId, continentId, countryId, yearVisited, pictureUrl}) {
        return Country.addLocation(name, userId, continentId, countryId, yearVisited, pictureUrl);
      }
    },
  }
});

module.exports = mutation;