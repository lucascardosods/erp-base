let express = require("express");
let path = require("path");
let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let config = require("./config");
let session = require("express-session");
let mongoose = require("mongoose");
// const MongoStore = require("connect-mongo")(session);
let router = require("./routes/routes_manager");
var fs = require('fs');
global.__CRYPTOKEY = config.CRYPTOKEY;
global.__CONFIG = config;
const model = require('./models/index');
const MONGO_URL = "mongodb+srv://admin:admin@cluster0-xbyc5.mongodb.net/";

let app = express();

let MongoClient = require('mongodb').MongoClient;

MongoClient.connect(MONGO_URL, function(err, connection) {
  global._connection = connection;
  if(err){
    console.log(err);
  }
  console.log('Connection is alive.');
});

app.use(
  session({
    secret: 'erpmanager',
    saveUninitialized: false,
    resave: true
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var multer = require('multer');
app.use(multer({
  dest: 'public/upload/temp'
}).any());


const ClientServices = require("./services/client-services.js")();
const CustomerServices = require("./services/customer-services.js")();

const myip = "localhost";
app.use(async function(req, res, next) {
  if (req.path.indexOf("/c/") !== -1) {
    let ar = req.path.split("/");
    let clientName = ar[2];
    console.log(clientName);
    let client = await ClientServices.find({'systemName' : clientName });
    CustomerServices.isRunning(client, function(r1){
      console.log('check is running');
      console.log(r1);
      if(r1){
        return res.redirect("http://"+myip+":"+client.port)
      } else {
        return res.redirect("/customer/hire");

      }
    })

  }
  else if (req.session.user || req.path === '/login' || req.path.indexOf("customer") !== -1) {
    return next();
  } else {
    return res.redirect("/login");
  }
});

router(app);


// catch 404 and forward t  o error handler
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

app.listen(80);

console.log('ERP Manager online.');

module.exports = app;
