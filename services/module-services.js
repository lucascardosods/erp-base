module.exports = function () {

  const moduleDAO = require('../DAO/ModuleDAO');

  return {


    findAllModules: async function (condition) {
      console.log(condition);
      try {
        return await moduleDAO.connection().find(condition).toArray();
      } catch(er){
        console.log(er);
        return (new Error('connection-error'));
      }
    },


  }

};
