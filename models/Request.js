var mongoose = require('mongoose');

var Request = mongoose.Schema({

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  amountOfData: { type: Number},
  page: { type: String }
});


module.exports = mongoose.model('Request', Request);
