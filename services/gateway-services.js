module.exports = function () {

  return {


    register: async function (systemFolder, port, callback) {
      const request = require('request');
      return callback(true);
      let res = await request.post(
        "http://localhost:8080/activate/"+port+"/"+systemFolder
        );
      callback(res);
    },

    unregister: async function (systemFolder, port, callback) {
      const request = require('request');
      return callback(true);
      let res = await request.post(
        "http://localhost:8080/deactivate/"+port+"/"+systemFolder
      );
      callback(res);
    },


  }

};
