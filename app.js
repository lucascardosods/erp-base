let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let config = require("./config");
let session = require("express-session");
let mongoose = require("mongoose");
let helmet = require("helmet");
const MongoStore = require("connect-mongo")(session);
let router = require("./routes/routes_manager");
let controller = require("./routes/routes_manager");
var fs = require('fs');
global.__CRYPTOKEY = config.CRYPTOKEY;

const MONGO_URL =
  process.env.MONGODB_URI ||
  "mongodb://erp_admin:qwerty123456@54.166.241.48/erp_manager";
//
// var proxy = require('redbird')({port: 8000, xfwd: false});
//
// // proxy.register("http://localhost:8000/g1", "g1.com.br");
// proxy.register("localhost:800/puc", "http://localhost:9000/home");
// // proxy.register("localhost:9000", "localhost");
//

var app = express();
// app.listen(process.env.PORT || 5050);


//copy the $file to $dir2
// var copyFile = (file, dir2)=>{
//   //include the fs, path modules
//   var fs = require('fs');
//   var path = require('path');
//
//   //gets file name and adds it to dir2
//   var f = path.basename(file);
//   var source = fs.createReadStream(file);
//   var dest = fs.createWriteStream(path.resolve(dir2, f));
//
//   source.pipe(dest);
//   source.on('end', function() { console.log('Succesfully copied'); });
//   source.on('error', function(err) { console.log(err); });
// };

//example, copy file1.htm from 'test/dir_1/' to 'test/'
// copyFile('../9feet.zip', './test/');

// mongoose.connect(MONGO_URL, { useMongoClient: true });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (){
//   console.log('connection opened');
// });
// app.use(helmet());
//
app.use(
  session({
    secret: config.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: false,
    resave: true
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(function(req, res, next) {
//   // if (req.session.user || req.url === "/home") {
//   //   next();
//   // } else {
//   //   res.redirect("/login");
//   // }
// });

router(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || 8001);


console.log('ERP Manager online.');

module.exports = app;
