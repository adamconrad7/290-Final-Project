
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3069;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.LOGNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://@${mongoHost}:${mongoPort}/db`;
var db = null;

var usersArr = require('./userData.json');

app.engine('handlebars', exphbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));

// <<<<<<< HEAD
// =======
// //"nodemon": "^1.19.1",
// >>>>>>> refs/remotes/origin/master

//Catches root path and serves all twits:
app.get('/', function (req, res) {
  console.log('responding to request for root');
  res.render('browsePage', {
    users: usersArr,

  });

});

app.get('/user', function (req, res) {
  console.log('responding to request for bio page');
    res.render('bioPage', {

    });
});

//This does nothing yet:
app.post('/addFav', function (req, res){
  console.log("got a post request");
  if (req.body && req.body.favsList) {
    console.log("== Client added the following users to their favorites list:");
    console.log("  - favsList:", req.body.favsList);

    // Add photo to DB here.

    res.status(200).send("favsList successfully added");
  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with photoURL and caption " +
      "fields.");
  }
});


MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
