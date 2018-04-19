module.exports = function () {

  const clientDAO = require('../DAO/ClientDAO');

  return {


    findAllClients: async function () {
      try {
        return await clientDAO.connection().findOne().toArray();
      } catch(er){
        console.log('er');
        console.log(er);
        return (new Error('connection-error'));
      }
    },


    createSystemFolder: function (clientSystemName, port) {
      console.log('create system folder');
      const exec = require('child_process').exec;
      var yourscript = exec('sh new_client.sh '+clientSystemName+' '+port, { detached: true},
        (error, stdout, stderr) => {
          var yourscript = exec('sh new_client2.sh '+clientSystemName+' '+port, { detached: true},
            (error, stdout, stderr) => {
              console.log(`${stdout}`);
              console.log(`${stderr}`);
              if (error !== null) {
                console.log(`exec error: ${error}`);
              }
            });
          console.log(`${stdout}`);
          console.log(`${stderr}`);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });
    },


  }

};
