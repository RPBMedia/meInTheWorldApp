const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
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
  yearVisited: { type: String },
  pictureUrl: { type: String },
}, {
    usePushEach: true
  });

mongoose.model('location', LocationSchema);
