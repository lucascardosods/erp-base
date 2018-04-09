const ModuleServices = require("../services/module-services.js")();

ClientController = {


  listPage : function(req, res) {
    res.render('client/list.ejs', {
      message: null
    });

  },
  newPage : async function(req, res) {
    let modules = await ModuleServices.findAllModules();
    res.render('client/form.ejs', {
      modules: modules,
      message: null
    });

  }
};

module.exports = ClientController;
