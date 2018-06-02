const ModuleServices = require("../services/module-services.js")();
const CustomerServices = require("../services/customer-services.js")();
const AccountabilityServices = require("../services/accoutability-services.js")();
let mongoose = require("mongoose");
const view = 'customer';
const ClientController = require('../controllers/ClientController.js');
const ClientServices = require("../services/client-services.js")();
const types = require("../helpers/types.js");


function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

CustomerController = {

  hirePage : async function(req, res) {
    let modules = await ModuleServices.findAllModules();
    res.render(view+'/customer_hire.ejs', {
      message: req.body.message,
      modules: modules
    });
  },

  newCustomer : function(req, callback) {
    try {
      req.body.systemName = req.body.name.replace(/\s/g, '');
      req.body.port = randomIntFromInterval(9000, 9999).toString();
      ClientController.postNewClient(req, null, function(client){
        callback(client);
      });
    } catch(e){
      callback({"error" : "Falha na criação."});
    }
  },

  checkCredentials : async function (req, res) {
    console.log('check credentials');
    try {
      let user = await CustomerServices.checkCredentials(req.body.systemName, req.body.password);
      // console.log(user);
      if(user instanceof Error){
        return res.render(view+'/customer_login.ejs', {
          message: { "error" : "Usuário ou senha incorreta." },
        });
      } else {
        console.log('redirect.');
        req.session.user = user._id;
        req.session.save();
        return res.redirect('/customer/dashboard');
      }
    }catch(e){
      console.log('login fail');
      res.render('customer/customer_login.ejs');
    }
  },

  loadDashboard : async function(req, res) {
    let contract = await AccountabilityServices.findContractByUserId(req.session.user);
    console.log(contract);
    let accountability = await AccountabilityServices.checkAccountability(contract);
    let client = await ClientServices.find({_id: mongoose.Types.ObjectId(req.session.user)});
    let modules = await ModuleServices.findAllModules({'_id' : {'$in' : client.modules}});
    CustomerServices.isRunning(client, function(running){
      console.log('===========LOAD DASHBOARD');
      // console.log(contract);
      // console.log(client);
      console.log(accountability);
      // console.log(modules);
      console.log('is Running: '+running);
      console.log('===========END LOAD DASHBOARD');
      return res.render(view+'/customer_dashboard.ejs', {
        modules: modules,
        message: req.body.message || null,
        client: client,
        contract: contract,
        types: types,
        accountability: accountability,
        running: running
      });
    })
  },

  deactivateSystem : async function(req, res) {
    try {
      ClientServices.stopCientBySystemFolder(req.params.systemFolder, function(er){
      });
    } catch(e){
      throw new Error("deactivate");
    }
  },

  activateCient : async function(req, res) {
    ClientServices.activateCientBySystemFolder(req.params.systemFolder, function(er){
      if(er){
        throw new Error(er);
      }
    });
  },

};

module.exports = CustomerController;
