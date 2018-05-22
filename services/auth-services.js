module.exports = function () {

  // const CryptoJS = require("crypto-js");
  const userDAO = require('../DAO/userDAO');
  const model = require('../models');

  return {

    checkCredentials : async function(username, userPass){
      console.log("check credentiasls");
      const user = await userDAO.connection().findOne({username: username});
        // console.log(user);
        if(user){
          if(userPass === user.password){
            console.log('correct password.');
            return user
          }
          else {
            return new Error('userOrPasswordNotFound');
          }
        } else {
          return new Error('userOrPasswordNotFound');
        }
    }
  }
};

