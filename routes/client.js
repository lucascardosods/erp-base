clientRouter = function(router) {

  const ClientController = require('../controllers/ClientController.js');

  router.get("/client/list", function (req, res) {
    ClientController.listPage(req, res)
  });

  router.get("/client/new", function (req, res) {
    ClientController.newPage(req, res)
  });

  router.post("/client/new", async function (req, res) {
    try {
      ClientController.postNewClient(req, res, function(e){
        req.body.message = {"success" : "Sucesso na criação"};
        ClientController.listPage(req, res);
      });
    } catch(e){
      req.body.message = {"error" : "Falha na criação."};
      ClientController.listPage(req, res);
    }

  });

  router.get("/client/activate/:systemFolder", function (req, res) {
    ClientController.activateCient(req, res)
  });

  router.get("/client/deactivate/:systemFolder", function (req, res) {
    ClientController.deactivateCient(req, res)
  });

};

module.exports = clientRouter;
