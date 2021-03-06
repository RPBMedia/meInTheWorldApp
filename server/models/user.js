const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Every user has a name, an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  continents: [{
    type: Schema.Types.ObjectId,
    ref: 'continent'
  }],
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

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

UserSchema.statics.addContinent = function (name, userId) {
  const Continent = mongoose.model('continent');
  console.log('Add continent triggered. Params: ', name, userId);
  return this.findById(userId)
    .populate('continents')
    .then(user => {
      const continentExists = user.continents.find(cont => cont.name.toLowerCase() === name.toLowerCase());
      if(continentExists) {
        console.log('continent exists. returning error')
        return new Promise((resolve, reject) => {
          reject('Continent with that name already exists');
        });
      } else {
        const continent = new Continent({ name, user })
        user.continents.push(continent)
        return Promise.all([continent.save(), user.save()])
          .then(([continent, user]) => user);
      }
    });
}

UserSchema.statics.findContinents = function (id) {
  return this.findById(id)
    .populate('continents')
    .then(user => user.continents);
}

UserSchema.statics.findCountries = function (id) {
  return this.findById(id)
    .populate('countries')
    .then(user => user.countries);
}

UserSchema.statics.findLocations = function (id) {
  return this.findById(id)
    .populate('locations')
    .then(user => user.locations);
}

UserSchema.statics.updateProfile = function(id, name, email) {
  return this.findOneAndUpdate({_id: id}, {
    name,
    email
  })
  .then(() => {
    return this.findById(id);
  })
}

mongoose.model('user', UserSchema);
