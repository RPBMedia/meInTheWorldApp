const mongoose = require('mongoose');
const graphql = require('graphql');
const ContinentType = require('./continent_type');

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
    continents: {
      type: new GraphQLList(ContinentType),
      resolve(parentValue) {
        return User.findContinents(parentValue.id);
      }
    }
  })
});

module.exports = UserType;