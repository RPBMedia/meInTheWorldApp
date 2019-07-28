const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContinentSchema = new Schema({
  name: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  countries: [{
    type: Schema.Types.ObjectId,
    ref: 'country'
  }],
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'location'
  }]
}, {
    usePushEach: true
});

ContinentSchema.statics.addCountry = function (name, userId, continentId) {
  const Country = mongoose.model('country');
  const User = mongoose.model('user');

  return User.findById(userId)
  .populate('countries')
  .then(user => {
    const countryExists = user.countries.find(cont => cont.name.toLowerCase() === name.toLowerCase());
    if(countryExists) {
      console.log('country exists. returning error')
      return new Promise((resolve, reject) => {
        reject('Country with that name already exists');
      });
    } else {
      this.findById(continentId)
      .then(continent => {
        const country = new Country({ name, continent, user })
        continent.countries.push(country);
        user.countries.push(country);
        return Promise.all([user.save(), country.save(), continent.save()])
          .then(([user, country, continent]) => continent);
      })
    }
  }); 
}

ContinentSchema.statics.findCountries = function (id) {
  return this.findById(id)
    .populate('countries')
    .then(continent => continent.countries);
}

ContinentSchema.statics.findLocations = function (id) {
  return this.findById(id)
    .populate('locations')
    .then(continent => continent.locations);
}

mongoose.model('continent', ContinentSchema);
