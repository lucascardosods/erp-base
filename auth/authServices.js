module.exports = function () {

  const model = require('../models');
  const CryptoJS = require("crypto-js");

  return {

    checkCredentials : function(username, userPass, callback){
      model.User.findOne({username: username}, function(e,user){
        console.log(user);
        if(user){
          if(userPass === user.password){
            console.log('correct password.');
            return callback(user)
          }
          else {
            return callback(new Error('userOrPasswordNotFound'));
          }
        } else {
          return callback(new Error('userOrPasswordNotFound'));
        }
      })
    }
  }
};

