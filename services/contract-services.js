module.exports = function () {

  const moduleDAO = require('../DAO/moduleDAO');

  return {


    createContract: async function (condition) {
      try {
        return await moduleDAO.connection().find(condition).toArray();
      } catch(er){
        console.log(er);
        return (new Error('connection-error'));
      }
    },


  }

};
