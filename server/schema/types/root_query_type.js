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


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dummyField: { type: GraphQLID},
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      }
    },
    continents: {
      type: new GraphQLList(ContinentType),
      resolve() {
        return Continent.find({})
      }
    }
    // songs: {
    //   type: new GraphQLList(SongType),
    //   resolve() {
    //     return Song.find({});
    //   }
    // },
    // song: {
    //   type: SongType,
    //   args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    //   resolve(parentValue, { id }) {
    //     return Song.findById(id);
    //   }
    // },
    // lyric: {
    //   type: LyricType,
    //   args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    //   resolve(parnetValue, { id }) {
    //     return Lyric.findById(id);
    //   }
    // }
  },
});

module.exports = RootQueryType;
