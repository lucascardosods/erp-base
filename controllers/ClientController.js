const ModuleServices = require("../services/module-services.js")();
const ClientServices = require("../services/client-services.js")();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

function bindPostNewClient(body) {
  if(body.name.length < 4 || body.port.length === 0 || body.systemName.length < 4){
    console.log('err');
    throw new Error("parameters");
  }

}

const authServices = require("../auth/authServices.js")();

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
    // var upload = multer().array('loginImage','smallImage');
    //   upload(req, res, async function (err) {
    //     if (err) {
    //       console.log(err);
    //       // An error occurred when uploading
    //     }
    //     else {
    let mod = "";
    if(req.body.clients){
      mod += "*clients*";
    }
    if(req.body.financial){
      mod += "*financial*";
    }
    try{
      ClientServices.createSystemFolder(req.body.systemName,req.body.port, mod);
      let client = bindPostNewClient(req.body);

    } catch(e){
      let modules = await ModuleServices.findAllModules();
      res.render('client/form.ejs', {
        modules: modules,
        message: "Erro de paramêtros"
      });
    }
    // }
    // })




  }

};

module.exports = ClientController;
