clientRouter = function(router) {

  const ClientController = require('../controllers/ClientController.js');

  router.get("/client/list", function (req, res) {
    console.log('s');
    ClientController.listPage(req, res)
  });

  router.get("/client/new", function (req, res) {
    ClientController.newPage(req, res)
  });


};

module.exports = clientRouter;
