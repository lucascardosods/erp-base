const ModuleServices = require("../services/module-services.js")();
const ClientServices = require("../services/client-services.js")();
var multer  = require('multer');
let mongoose = require('mongoose');

var upload = multer({ dest: 'uploads/' });

function bindPostNewClient(body) {
  if(body.name.length < 4 || body.port.length === 0 || body.systemName.length < 4){
    console.log('err');
    throw new Error("parameters");
  } else {
    let client = new mongoose.models.Client();
    client.name = body.name;
    client.systemName = body.systemName
    client.port = body.port;
    console.log(client);
    return client;
  }

}


ClientController = {


  listPage : async function(req, res) {
    let clients = await ClientServices.listClients();
    res.render('client/list.ejs', {
      message: null,
      clients: clients
    });

  },

  newPage : async function(req, res) {
    let modules = await ModuleServices.findAllModules();
    res.render('client/form.ejs', {
      modules: modules,
      message: null
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
      ClientServices.createSystemFolder(req.body.systemName,req.body.port, mod, async function(er){
        if(er){
          console.log(er);
          throw new Error("fail");
        }else {
          console.log('else');
          let response = await ClientServices.createClient(bindPostNewClient(req.body));
          console.log(response);
          if(!response){
            let modules = await ModuleServices.findAllModules();
            res.render('client/form.ejs', {
              modules: modules,
              message: "Criado com sucesso."
            });              } else {
            res.send({"status": "failure"})
          }
        }

      });

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
