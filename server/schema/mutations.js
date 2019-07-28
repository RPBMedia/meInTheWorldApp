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
        userId: { type: GraphQLID },
        countryId: { type: GraphQLID },
        continentId: { type: GraphQLID },
      },
      resolve(parentValue, { id, userId, countryId, continentId }){
        console.log("Calling DeleteLocation with params: ", id, userId, countryId, continentId);
        if(countryId === null && continentId === null) {
          return User.findById(userId)
            .populate('locations')
            .then(user => {
              const indexUser = user.locations.map(loc => loc.id).indexOf(id);
              user.locations.splice(indexUser, 1);

              return Promise.all([user.save(), Location.remove({ _id: id})])
                .then(([user, location]) => location);
            });
        } else if(countryId === null && continentId !== null) {
          return User.findById(userId)
            .populate('locations')
            .then(user => {
              Continent.findById(continentId)
                .populate('locations')
                .then(continent => {
                  const indexUser = user.locations.map(loc => loc.id).indexOf(id);
                  user.locations.splice(indexUser, 1);

                  const indexContinent = continent.locations.map(loc => loc.id).indexOf(id);
                  continent.locations.splice(indexContinent, 1);

                  return Promise.all([user.save(), continent.save(), Location.remove({ _id: id})])
                    .then(([user, continent, location]) => location);
            });
          });
        } else if (countryId !== null && continentId === null) {
          return User.findById(userId)
            .populate('locations')
            .then(user => {
            Country.findById(countryId)
            .populate('locations')
              .then(country => {
                const indexUser = user.locations.map(loc => loc.id).indexOf(id);
                user.locations.splice(indexUser, 1);

                const indexCountry = country.locations.map(loc => loc.id).indexOf(id);
                country.locations.splice(indexCountry, 1)

                return Promise.all([user.save(), country.save(), Location.remove({ _id: id})])
                  .then(([user, country, location]) => location);
            });
          });
        } else {
          return User.findById(userId)
            .populate('locations')
            .then(user => {
            Continent.findById(continentId)
              .populate('locations')
              .then(continent => {
                Country.findById(countryId)
                .populate('locations')
                .then(country => {
                  const indexUser = user.locations.map(loc => loc.id).indexOf(id);
                  user.locations.splice(indexUser, 1);

                  const indexContinent = continent.locations.map(loc => loc.id).indexOf(id);
                  continent.locations.splice(indexContinent, 1)
    
                  const indexCountry = country.locations.map(loc => loc.id).indexOf(id);
                  country.locations.splice(indexCountry, 1)
                  return Promise.all([user.save(), country.save(), continent.save(), Location.remove({ _id: id})])
                    .then(([user, country, continent, location]) => location);
                });
              });
            });
        }
      }
    },
    deleteCountry: {
      type: CountryType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        continentId: { type: GraphQLID },
      },
      resolve(parentValue, { id, userId, continentId }){
        console.log("Calling DeleteCountry with params: ", id, continentId);
        if(continentId === null){
          return User.findById(userId)
            .populate('countries')
            .then(user => {
              const indexUser = user.countries.map(country => country.id).indexOf(id);
              user.countries.splice(indexUser, 1);

              return Promise.all([user.save(), Country.remove({ _id: id })])
                .then(([user, country]) => country);
            });
        } else {
          return User.findById(userId)
            .populate('countries')
            .then(user => {
            Continent.findById(continentId)
              .populate('countries')
              .then(continent => {
                const indexUser = user.countries.map(country => country.id).indexOf(id);
                user.countries.splice(indexUser, 1);

                const indexContinent = continent.countries.map(country => country.id).indexOf(id);
                continent.countries.splice(indexContinent, 1)
    
                return Promise.all([user.save(), continent.save(), Country.remove({ _id: id})])
                  .then(([user, continent, country]) => country);
              });
            });
        }
      }
    },
    deleteContinent: {
      type: ContinentType,
      args: {
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { id, userId }) {
        console.log("Calling DeleteContinent with params: ", id, userId);
        return User.findById(userId)
            .populate('continents')
            .then(user => {
              console.log(user.continents)
              const indexUser = user.continents.map(cont => cont.id).indexOf(id);
              console.log(indexUser);
              user.continents.splice(indexUser, 1);
              console.log("New continent list: ", user.continents);

              return Promise.all([user.save(), Continent.remove({ _id: id })])
                .then(([user, continent]) => continent);
            });
      }
    }
  }
});

module.exports = mutation;