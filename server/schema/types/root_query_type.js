const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = require('./user_type');
const ContinentType = require('./continent_type');
const CountryType = require('./country_type');
const LocationType = require('./location_type');

const User = mongoose.model('user');
const Continent = mongoose.model('continent');
const Country = mongoose.model('country');
const Location = mongoose.model('location');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    userById: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      }
    },
    continentsByUser: {
      type: new GraphQLList(ContinentType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { userId }) {
        return User.findById(userId)
          .populate('continents')
          .then(user => {
            return user.continents
          });
      }
    },
    countriesByUser: {
      type: new GraphQLList(CountryType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { userId }) {
        return User.findById(userId)
          .populate('countries')
          .then(user => {
            return user.countries
          });
      }
    },
    locationsByUser: {
      type: new GraphQLList(LocationType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { userId }) {
        return User.findById(userId)
          .populate('locations')
          .then(user => {
            return user.locations
          });
      }
    },
    locationsByContinent: {
      type: new GraphQLList(LocationType),
      args: { continentId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { continentId }) {
        return Continent.findById(continentId)
          .populate('locations')
          .then(continent => {
            return continent.locations;
          });
      }
    },
    locationsByCountry: {
      type: new GraphQLList(LocationType),
      args: { countryId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { countryId }) {
        return Country.findById(countryId)
          .populate('locations')
          .then(country => {
            return country.locations;
          });
      }
    }
  },
});

module.exports = RootQueryType;
