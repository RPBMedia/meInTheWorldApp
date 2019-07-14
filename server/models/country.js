const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String },
  userId: { type: String },
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

CountrySchema.statics.addLocation = function (
  name,
  userId,
  continentId,
  countryId,
  yearVisited,
  pictureUrl) {
  const Location = mongoose.model('location');
  const Continent = mongoose.model('continent');

  const countryPromise = this.findById(countryId)
    .then(country => {
      Continent.findById(continentId)
        .then(continent => {
          const location = new Location({
            name,
            userId,
            continent,
            country,
            yearVisited,
            pictureUrl,
          });
          country.locations.push(location)
          continent.locations.push(location)
          return Promise.all([continent.save(), country.save(), location.save()])
            .then(([continent, country, location]) => country);
        });
    });

  return countryPromise;
}

CountrySchema.statics.findLocations = function (id) {
  return this.findById(id)
    .populate('locations')
    .then(country => country.locations);
}

mongoose.model('country', CountrySchema);
