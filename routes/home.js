homeRouter = function(router) {
  /* GET home page. */

  router.get("/home", function (req, res, next) {
    res.render('home', {
      message: null
    });
  });

  const exec = require('child_process').exec;

  router.get("/c/:name", function (req, res, next) {
    let clientport = "9494";
    var yourscript = exec('lsof -t -i:'+clientport, { detached: true},
      (error, stdout, stderr) => {
        if(stdout){
          res.redirect('http://localhost:'+clientport);
          console.log('stdout');
          console.log(stdout);
        }
        if (error !== null) {
        } else {

        }
      });
  });


};

module.exports = homeRouter;
