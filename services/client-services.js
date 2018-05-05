module.exports = function () {

  const clientDAO = require('../DAO/ClientDAO');
  const exec = require('child_process').exec;

  return {


    listClients: async function () {
      try {
        return await clientDAO.connection().find().toArray();
      } catch(er){
        return (new Error('connection-error'));
      }
    },

    createClient: async function (client) {
      try {
        clientDAO.connection().insert(client, function (res) {
          return res;
        })
      } catch(er){
        return er;
      }
    },


    createSystemFolder: function (clientSystemName, port, mod, menu, callback) {
      console.log('Start creating system folder');
      var yourscript = exec('sh scripts/new_client.sh '+clientSystemName+' '+port+ ' '+mod, { detached: true},
        (error, stdout, stderr) => {
          console.log('Creating system 2....');
          var yourscript = exec('sh scripts/new_client2.sh '+clientSystemName+' \"' +menu+ '\" '+mod, { detached: true},
            (error, stdout, stderr) => {
              console.log(stdout);
              console.log(stderr);

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

    activateCientBySystemFolder: function(systemName, callback){
      console.log('Start activating '+systemName);
      var script = exec('sh scripts/activate.sh '+systemName, { detached: true},
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            return callback(new Error('fail'));
          } else {
            return callback()
          }
        });
    },
    stopCientBySystemFolder: function(systemName, callback){
      var script = exec('sh stop.sh '+systemName, { detached: true},
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            return callback(new Error('fail'));
          } else {
            return callback()
          }
        });

    }

  }

};
