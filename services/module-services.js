module.exports = function () {

  // let mongoose = require('mongoose');

  return {


    findAllModules: async function () {
      return [{
        name: "Clientes",
        folderName: "clients",
        menuData: "not",
        repoURL: "https://github.com/lucascardosods/erp-module-clients.git",
      },
        {
          name: "Financeiro",
          folderName: "financial",
          menuData: "not",
          repoURL: "https://github.com/lucascardosods/erp-module-financial.git",
        }

      ]

    },


  }

};
