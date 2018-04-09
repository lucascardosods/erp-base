let mongoose = require('mongoose');

let Module = mongoose.Schema({
  name: {type: String, required: true, },
  folderName: {type: String, required: true, },
  menuData: {type: String, required: true, },
  repoURL: {type: String, required: true, },
});


module.exports = mongoose.model('Module', Module);
