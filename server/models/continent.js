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
  }]
}, {
    usePushEach: true
});

ContinentSchema.statics.addCountry = function (name, continentId) {
  const Country = mongoose.model('country');

  return this.findById(continentId)
    .then(continent => {
      const country = new Country({ name, continent })
      continent.countries.push(country)
      return Promise.all([country.save(), continent.save()])
        .then(([country, continent]) => continent);
    });
}

ContinentSchema.statics.findCountries = function (id) {
  return this.findById(id)
    .populate('countries')
    .then(continent => continent.countries);
}

mongoose.model('continent', ContinentSchema);
