module.exports = function () {

  const moduleDAO = require('../DAO/ModuleDAO');
  const clientDAO = require('../DAO/ClientDAO');

  return {


    checkCredentials: async function (systemName, password) {
      const client = await clientDAO.connection().findOne({"systemName" : systemName});
      if(client){
        if(password === client.password){
          console.log('correct password.');
          return client
        }
        else {
          return new Error('userOrPasswordNotFound');
        }
      } else {
        return new Error('userOrPasswordNotFound');
      }
    },


  }

};
