module.exports = function () {

  const clientDAO = require('../DAO/clientDAO');
  const exec = require('child_process').exec;

  return {


    checkCredentials: async function (systemName, password) {
      const client = await clientDAO.connection().findOne({"systemName": systemName});
      if (client) {
        if (password === client.password) {
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

    isRunning: function (client, callback) {
      console.log("lsof -t -i:" + client.port);
      exec('lsof -t -i:' + client.port, {detached: true},
        (error, stdout, stderr) => {
          console.log(stdout);
          if (stdout) {
            return callback(true);
          }
          if (error !== null) {
            return callback(false);
          } else {

            return callback(false);
          }

        });
    },

    activateClientIfContract : async function(client){
      let contract = await AccountabilityServices.findContractByUserId(client._id);
      if(!contract){
        return false;
      }
      if(contract.type === types.Contract.TIME_AUTOMATIC._id){
        ClientServices.activateCientBySystemFolder(client.systemName, function(resposta){
          if(resposta){
            throw new Error("no.contract");
          } else {
            // REGISTERING ON GATEWAY
            return true;
          }
        })
      }
    },
  }

};
