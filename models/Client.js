let mongoose = require('mongoose');


let Client = mongoose.Schema({

  name: {type: String, required: true, },
  systemName: {type: String, required: true, },
  password: {type: String, required: true, },
  port: {type: String, required: true, },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  creationDate: {type: Date, Default: new Date() },


});

module.exports = mongoose.model('Client', Client);

