module.exports = function () {

  const userDAO = require('../DAO/userDAO');
  const model = require('../models');

  return {

    checkCredentials : async function(username, userPass, callback){
      console.log("check credentiasls");
      const user = await userDAO.connection().findOne({username: username});
        // console.log(user);
        if(user){
          if(userPass === user.password){
            console.log('correct password.');
            console.log(user);
            return callback(user)
          }
          else {
            console.log('erro');
            return callback(new Error('userOrPasswordNotFound'));
          }
        } else {
          console.log('erro2');
          return callback(new Error('userOrPasswordNotFound'));
        }
    }
  }
};

