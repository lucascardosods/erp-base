customerRouter = function(router) {
  const CustomerController = require('../controllers/CustomerController.js');

  router.get("/customer/hire", function (req, res) {
    CustomerController.hirePage(req,res);
  });

  router.post("/customer/new", function (req, res) {
    try {
      CustomerController.newCustomer(req, function(client){
        if(client) {
          console.log(client);
          res.render('customer/customer_welcome.ejs', {
            client: client
          });
        }
      });
    } catch(e){
      res.render('/customer/customer_hire.ejs', {
        message: "Fail",
        modules: modules
      });
    }

  });

  router.get("/customer/welcome", function (req, res) {
    res.render('customer/customer_welcome.ejs', {
      customerLink: "/",
      message: null
    });
  });

  router.get("/customer/login", function (req, res) {
    res.render('customer/customer_login.ejs', {
      message: null
    });
  });

  router.post("/customer/login", function (req, res) {
    CustomerController.checkCredentials(req, res);
  });

  router.get("/customer/dashboard", function (req, res) {
    CustomerController.loadDashboard(req, res);
  });

};

module.exports = customerRouter;
