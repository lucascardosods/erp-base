module.exports = function () {

  // const gatewayURL = "http://localhost:8080/activate/";
  return {


    register: async function (systemFolder, port, callback) {
      console.log("http://"+systemFolder+".localhost:8080/activate/"+port);
      const request = require('request');
      let res = await request.post(
        "http://localhost:8080/activate/"+port+"/"+systemFolder
        );
      callback(res);
    },


  }

};
