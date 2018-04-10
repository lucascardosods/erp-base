// This file will require all routes inside this folder

const fs = require('file-system');
const path = require('path');

router = function (server){
  server.get('/', function(req, res, next){
    res.redirect('/home');
  });

  let routes = [];
  const walkSync = (d) => fs.statSync(d).isDirectory() ? fs.readdirSync(d).map(f => walkSync(path.join(d, f))) : d;
  let files = walkSync('./routes');
  files.forEach(function(file){
    // console.log(file);
    if(file !== 'routes/routes_manager.js') {
      let v = require('../' + file);
      routes.push(v)
    }
  });
  routes.forEach(function(route){
    route(server);
  })


};

module.exports = router;