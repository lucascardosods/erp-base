var mongoose = require('mongoose');


var Client = mongoose.Schema({

  name: {type: String, required: true, },
  systemName: {type: String, required: true, },
  port: {type: String, required: true, },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  creationDate: {type: Date, required: true, },

});


module.exports = mongoose.model('Client', Client);

