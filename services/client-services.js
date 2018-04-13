module.exports = function () {

  // let mongoose = require('mongoose');

  return {


    findAllClients: async function () {
      return []

    },


    createSystemFolder: function (clientSystemName, port) {
      console.log('create system folder');
      const exec = require('child_process').exec;
      var yourscript = exec('sh new_client.sh '+clientSystemName+' '+port,
        (error, stdout, stderr) => {
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
    },


  }

};
