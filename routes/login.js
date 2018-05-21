loginRouter = function(router) {
  const authServices = require("../services/auth-services.js")();
  /* GET home page. */
  router.get("/login", function(req, res, next) {
    if (req.session.user) {
      res.redirect("/home");
    } else {
      res.render("login", { username: "", password: "", message: null });
    }
  });

  router.post("/login", function(req, res) {
    console.log('/login');
    if (req.body.username.length < 4 || req.body.password.length < 4) {
      res.render("login", {
        username: "",
        password: "",
        message: { error: "Preencha os campos para entrar." }
      });
    } else {
      authServices.checkCredentials(req.body.username, req.body.password, function(
        response
      ) {
        if (response instanceof Error) {
          res.render("login", {
            username: "",
            password: "",
            message: { error: "Usuário ou senha incorretos." }
          });
        } else {
          console.log('router-login: successo');
          req.session.user = response;
          res.redirect("/home");
        }
      });
    }
  });
};

module.exports = loginRouter;
