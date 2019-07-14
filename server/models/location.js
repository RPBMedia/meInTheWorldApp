const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  yearVisited: { type: String },
  pictureUrl: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  continent: {
    type: Schema.Types.ObjectId,
    ref: 'continent'
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'country'
  },
}, {
    usePushEach: true
  });

mongoose.model('location', LocationSchema);
