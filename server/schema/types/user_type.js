const mongoose = require('mongoose');
const graphql = require('graphql');
const ContinentType = require('./continent_type');
const CountryType = require('./country_type');
const LocationType = require('./location_type');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parentValue) {
        return User.findCountries(parentValue.id);
      }
    },
    continents: {
      type: new GraphQLList(ContinentType),
      resolve(parentValue) {
        return User.findContinents(parentValue.id);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue) {
        return User.findLocations(parentValue.id);
      }
    }
  })
});

module.exports = UserType;