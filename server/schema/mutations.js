const graphql = require('graphql');
const AuthService = require('../services/auth');

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('./types/user_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
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
    }
  }
});

module.exports = mutation;