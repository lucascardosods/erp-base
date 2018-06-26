loginRouter = function(router) {

  const authServices = require("../services/auth-services.js")();


  router.get("/login", function(req, res) {
    console.log('/login router');
    if (req.session.user) {
      console.log('req session user');
      res.redirect("/home");
    } else {
      console.log('login');
      res.render("login", { username: "", password: "", message: null });
    }
  });

  router.post("/login", function(req, res) {
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
        console.log('return check');
        console.log(response);
        if (response instanceof Error) {
          console.log('instance of error');
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
