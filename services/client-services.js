module.exports = function () {

  const clientDAO = require('../DAO/ClientDAO');

  return {


    listClients: async function () {
      try {
        return await clientDAO.connection().find().toArray();
      } catch(er){
        return (new Error('connection-error'));
      }
    },

    createClient: async function (client) {
      console.log('create client');
      try {
        clientDAO.connection().insert(client, function (res) {
          return res;
        })
      } catch(er){
        console.log(er);
        return er;
      }
    },


    createSystemFolder: function (clientSystemName, port, mod, callback) {
      console.log('create system folder');
      const exec = require('child_process').exec;
      var yourscript = exec('sh new_client.sh '+clientSystemName+' '+port, { detached: true},
        (error, stdout, stderr) => {
          var yourscript = exec('sh new_client2.sh '+clientSystemName+' '+port, { detached: true},
            (error, stdout, stderr) => {
              if (error !== null) {
                return callback(new Error('folder'));
              } else {
                return callback()
              }
            });
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
    },


  }

};
