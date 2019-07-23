const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = graphql;

const CountryType = require('./country_type');
const LocationType = require('./location_type');
const Continent = mongoose.model('continent');

const ContinentType = new GraphQLObjectType({
  name: 'ContinentType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Continent.findById(parentValue).populate('user')
          .then(continent => {
            return continent.user
          });
      }
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parentValue) {
        return Continent.findCountries(parentValue.id);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue) {
        return Continent.findLocations(parentValue.id);
      }
    }
  })
});

module.exports = ContinentType;