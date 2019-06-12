
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3069;

var mongoHost = 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = 'cs290_reidash';
var mongoPassword =  'cs290_reidash';
var mongoDBName = 'cs290_reidash';

// mongoimport --host classmongo.engr.oregonstate.edu \
//   --username cs290_reidash                 \
//   --db cs290_reidash                        \
//   --password cs290_reidash                \
//   --collection users --jsonArray userData.json

// mongo -u cs290_reidash -p cs290_reidash \
//     classmongo.engr.oregonstate.edu/cs290_reidash


//var mongoUrl = `mongodb://@${mongoHost}:${mongoPort}/db`;
var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;

var db = null;

var usersArr = require('./userData.json');

app.engine('handlebars', exphbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));


//Catches root path and serves all twits:
app.get('/', function (req, res) {
  console.log('responding to request for root');
  var users = db.collection("users");
  var usersCursor = users.find({});
  usersCursor.toArray(function (err, usersArr){
    if(err){
      throw err;
      res.status(500).send({
        error: "Error fetching users from DB"
      });
    }else{
      console.log("Fetching users from database", users);
      res.render('browsePage', {
        users: usersArr,
      });
    }
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
