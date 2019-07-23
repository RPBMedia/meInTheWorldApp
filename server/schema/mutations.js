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
const LocationType = require('./types/location_type');

const User = mongoose.model('user');
const Continent = mongoose.model('continent');
const Country = mongoose.model('country');
const Location = mongoose.model('location');



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
        console.log("Calling addLocation with params: ", name, userId, continentId, countryId, yearVisited, pictureUrl);
        return Country.addLocation(name, userId, continentId, countryId, yearVisited, pictureUrl);
      }
    },
    deleteLocation: {
      type: LocationType,
      args: {
        id: { type: GraphQLID },
        countryId: { type: GraphQLID },
        continentId: { type: GraphQLID },
      },
      resolve(parentValue, { id, countryId, continentId }){
        console.log("Calling DeleteLocation with params: ", id, countryId, continentId);
        return Continent.findById(continentId)
          .populate('locations')
          .then(continent => {
            Country.findById(countryId)
            .populate('locations')
            .then(country => {
              const indexContinent = continent.locations.map(loc => loc.id).indexOf(id);
              continent.locations = continent.locations.splice(indexContinent, 1)

              const indexCountry = country.locations.map(loc => loc.id).indexOf(id);
              country.locations = country.locations.splice(indexCountry, 1)
              return Promise.all([country.save(), continent.save(), Location.remove({ _id: id})])
                .then(([country, continent, location]) => location);
            });
          });
      }
    },
    deleteCountry: {
      type: LocationType,
      args: {
        id: { type: GraphQLID },
        continentId: { type: GraphQLID },
      },
      resolve(parentValue, { id, continentId }){
        console.log("Calling DeleteCountry with params: ", id, continentId);
        return Continent.findById(continentId)
          .populate('countries')
          .then(continent => {
            const indexContinent = continent.countries.map(country => country.id).indexOf(id);
            continent.countries = continent.countries.splice(indexContinent, 1)

            return Promise.all([continent.save(), Country.remove({ _id: id})])
              .then(([continent, country]) => country);
          });
      }
    },
    deleteContinent: {
      type: LocationType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return Continent.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;