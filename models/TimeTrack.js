var mongoose = require('mongoose');

var TimeTrack = mongoose.Schema({

  started: {type: Date, required: true, },
  stopped: {type: Date },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],

});


module.exports = mongoose.model('TimeTrack', TimeTrack);
