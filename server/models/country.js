const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String },
  continent: {
    type: Schema.Types.ObjectId,
    ref: 'continent'
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'location'
  }]
}, {
    usePushEach: true
});

CountrySchema.statics.findLocations = function (id) {
  return this.findById(id)
    .populate('locations')
    .then(country => country.locations);
}

mongoose.model('country', CountrySchema);
