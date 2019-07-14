const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const LocationType = require('./location_type');
const Country = mongoose.model('country');

const CountryType = new GraphQLObjectType({
  name: 'CountryType',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Country.findById(parentValue).populate('user')
          .then(country => {
            return country.user
          });
      }
    },
    continent: {
      type: require('./continent_type'),
      resolve(parentValue) {
        return Country.findById(parentValue).populate('continent')
          .then(country => {
            console.log(country)
            return country.continent
          });
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue) {
        return Country.findLocations(parentValue.id);
      }
    }
  })
});

module.exports = CountryType;