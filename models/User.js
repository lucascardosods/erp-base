var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

  username: {type: String, required: true, index: { unique: true }},
  password: {type: String, required: true },


});


module.exports = mongoose.model('User', UserSchema);
