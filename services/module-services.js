module.exports = function () {

  const moduleDAO = require('../DAO/ModuleDAO');

  return {


    findAllModules: async function () {
      try {
        return await moduleDAO.connection().find({}).toArray();
      } catch(er){
        console.log(er);
        return (new Error('connection-error'));
      }
    },


  }

};
