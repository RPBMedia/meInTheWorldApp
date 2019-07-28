const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
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
  const User = mongoose.model('user');


  return User.findById(userId)
    .populate('locations')
    .then(user => {
      const locationExists = user.locations.find(loc => loc.name.toLowerCase() === name.toLowerCase());
      if(locationExists) {
        console.log('location exists. returning error')
        return new Promise((resolve, reject) => {
          reject('Location with that name already exists');
        });
      } else {
        Continent.findById(continentId)
          .then(continent => {
            this.findById(countryId)
            .then(country => {
              const location = new Location({
                name,
                user,
                continent,
                country,
                yearVisited,
                pictureUrl,
              });
              user.locations.push(location);
              country.locations.push(location);
              continent.locations.push(location);
              return Promise.all([user.save(), continent.save(), country.save(), location.save()])
                .then(([user, continent, country, location]) => country);
              });
          })
        }
    }); 
}

CountrySchema.statics.findLocations = function (id) {
  return this.findById(id)
    .populate('locations')
    .then(country => country.locations);
}

mongoose.model('country', CountrySchema);
