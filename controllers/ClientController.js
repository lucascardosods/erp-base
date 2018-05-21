const ModuleServices = require("../services/module-services.js")();
const ClientServices = require("../services/client-services.js")();
var multer  = require('multer');
let mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' });

async function bindPostNewClient(body) {
  console.log(body);
  let ar = [];
  for (let key in body){
    if(body[key].indexOf("erp-module") !== -1){
      ar.push(body[key])
    }
  }
  let modules = await ModuleServices.findAllModules({'folderName' : {'$in' : ar}});
  let client = new mongoose.models.Client();
  client.modules = modules;
  client.password =  body.systemName;
  client.name = body.name;
  client.systemName = body.systemName;
  client.port = body.port;
  return {"client" : client, "modules" : modules};

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
    ClientServices.activateCientBySystemFolder(req.params.systemFolder, function(er){
      if(er){
        throw new Error(er);
      }
    });
  },

  deactivateCient : async function(req, res) {
    try {
      ClientServices.stopCientBySystemFolder(req.params.systemFolder, function(er){

      });
    } catch(e){
      throw new Error("deactivate");
    }
  },

  postNewClient : async function(req, res, callback) {

    // var upload = multer().array('loginImage','smallImage');
    //   upload(req, res, async function (err) {
    //     if (err) {
    //       console.log(err);
    //       // An error occurred when uploading
    //     }
    //     else {
    console.log(req.body);
    // return
    let modsForGit = "";
    if(req.body["erp-module-clients"]){
      modsForGit += "*clients*";
    }
    if(req.body["erp-module-financial"]){
      modsForGit += "*financial*";
    }
    console.log('mod');
    console.log(modsForGit);
    let client;
    let modules;
    try {
      let response = await bindPostNewClient(req.body);
      client = response["client"];
      modules = response["modules"];
    } catch(er){
      throw new Error("parameters");
    }
    let response = await ClientServices.createClient(client);
    if(!response){
      // Contract async
      ClientServices.registerClientContract(req.body, client._id);
      // Change menu layout
      try{
        let menu = "";

        modules.forEach(function(module){
          menu += module.menuData;
        });
        // Start creation system
        ClientServices.createSystemFolder(client, modsForGit, menu, function(er){
          if(er){
            throw new Error("folder_creation");
          }else {
            callback(client)
          }
        });

      } catch(e){
        throw new Error("parameters");

      }
    } else {
      throw new Error("user_creation");
    }


  }

};

module.exports = ClientController;
