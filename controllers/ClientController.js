const ModuleServices = require("../services/module-services.js")();
const ClientServices = require("../services/client-services.js")();
var multer  = require('multer');
let mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' });

async function bindPostNewClient(body) {
  if(body.name.length < 4 || body.port.length === 0 || body.systemName.length < 4){
    console.log('err');
    throw new Error("parameters");
  } else {
    let ar = [];
    for (let key in body){
      if(body[key].indexOf("erp-module") !== -1){
        ar.push(body[key])
      }
    }
    let modules = await ModuleServices.findAllModules({'folderName' : {'$in' : ar}});
    let client = new mongoose.models.Client();
    client.modules = modules;
    client.name = body.name;
    client.systemName = body.systemName;
    client.port = body.port;
    console.log(client);
    return client;
  }

}


ClientController = {


  listPage : async function(req, res) {
    let clients = await ClientServices.listClients();
    res.render('client/list.ejs', {
      message: req.body.message,
      clients: clients,
      title: "Clientes Cadastrados"
    });

  },

  newPage : async function(req, res) {
    let modules = await ModuleServices.findAllModules();
    res.render('client/form.ejs', {
      modules: modules,
      message: null,
      title: "Novo Cliente"
    });
  },

  activateCient : async function(req, res) {
    console.log(req.params.systemFolder);
    try {
      ClientServices.activateCientBySystemFolder(req.params.systemFolder, function(er){
        console.log(er);
      });
    } catch(e){
      console.log('er');
    }
    res.redirect("/client/list")
  },

  postNewClient : function(req, res, callback) {
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
      ClientServices.createSystemFolder(req.body.systemName,req.body.port, mod, async function(er){
        if(er){
          throw new Error("folder_creation");
        }else {
          let client = await bindPostNewClient(req.body);
          let response = await ClientServices.createClient(client);
          if(!response){
            return callback()
          } else {
            throw new Error("user_creation");
          }
        }

      });

    } catch(e){
      throw new Error("parameters");

    }

  }

};

module.exports = ClientController;
