const ModuleServices = require("../services/module-services.js")();

function bindPostNewClient(body) {
  if(body.name.length < 4 || body.port.length === 0 || body.systemName.length < 4){
    console.log('err');
     throw new Error("parameters");
  }

}

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
  },

  postNewClient : async function(req, res) {
    console.log(req.body);
    try{
        console.log('try');
        let client = bindPostNewClient(req.body);

      } catch(e){
        console.log('catch');
        let modules = await ModuleServices.findAllModules();
        res.render('client/form.ejs', {
          modules: modules,
          message: "Erro de paramêtros"
        });
      }


  }

};

module.exports = ClientController;
