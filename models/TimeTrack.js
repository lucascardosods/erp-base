let mongoose = require('mongoose');

let TimeTrack = mongoose.Schema({

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
  paid: {type: Boolean, default: false },


});

module.exports = mongoose.model('TimeTrack', TimeTrack);
