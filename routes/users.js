userRouter = function(router) {

  router.get("/login", function (req, res, next) {
    if (req.session.user) {
      res.redirect("/home");
    } else {
      res.render("login", {username: "", password: "", message: null});
    }
  });

};


module.exports = userRouter;
