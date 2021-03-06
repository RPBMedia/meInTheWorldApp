const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const Location = mongoose.model('location');

const UserType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    yearVisited: { type: GraphQLString },
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return Location.findById(parentValue).populate('user')
          .then(location => {
            return location.user
          });
      }
    },
    continent: {
      type: require('./continent_type'),
      resolve(parentValue) {
        return Location.findById(parentValue).populate('continent')
          .then(location => {
            return location.continent
          });
      }
    },
    country: {
      type: require('./country_type'),
      resolve(parentValue) {
        return Location.findById(parentValue).populate('country')
          .then(location => {
            return location.country
          });
      }
    },
  })
});

module.exports = UserType;