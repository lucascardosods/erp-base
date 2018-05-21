const ModuleServices = require("../services/module-services.js")();
const CustomerServices = require("../services/customer-services.js")();

const view = 'customer';
const ClientController = require('../controllers/ClientController.js');

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
      console.log(user);
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
    console.log(req.session);
    res.render(view+'/customer_dashboard.ejs', {
      message: req.body.message,
    });
  },

};

module.exports = CustomerController;
