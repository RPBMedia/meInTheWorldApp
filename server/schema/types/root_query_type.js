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
    continentsByUser: {
      type: new GraphQLList(ContinentType),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id)
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
        return Country.find({ userId });
      }
    },
    locationsByUser: {
      type: new GraphQLList(LocationType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { userId }) {
        return Location.find({ userId });
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
