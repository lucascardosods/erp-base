homeRouter = function(router) {
  /* GET home page. */

  router.get("/home", function (req, res, next) {
    res.render('home', {
      message: null
    });
  });


};

module.exports = homeRouter;
