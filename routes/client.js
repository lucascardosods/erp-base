clientRouter = function(router) {

  const ClientController = require('../controllers/ClientController.js');

  router.get("/client/list", function (req, res) {
    ClientController.listPage(req, res)
  });



  router.get("/client/new", function (req, res) {
    ClientController.newPage(req, res)
  });

  router.post("/client/new", function (req, res) {
    ClientController.postNewClient(req, res)
  });

  router.get("/client/activate/:systemFolder", function (req, res) {
    ClientController.activateCient(req, res)
  });

};

module.exports = clientRouter;
