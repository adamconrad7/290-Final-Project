
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3069;

var usersArr = require('./userData.json');

app.engine('handlebars', exphbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));

//Catches root path and serves all twits:
app.get('/', function (req, res) {
  console.log('responding to request');
    res.render('browsePage', {
      users: usersArr
    });
});

app.get('/user', function (req, res) {
  console.log('responding to request for bio page');
    res.render('bioPage', {
    
    });
});

//This does nothing yet:
app.post('/', function (req, res){
  if (req.body && req.body.favsList) {
    console.log("== Client added the following users to their favorites list:");
    console.log("  - favsList:", req.params.favsList);

    // Add photo to DB here.

    res.status(200).send("favsList successfully added");
  } else {
    res.status(400).send("Requests to this path must " +
      "contain a JSON body with photoURL and caption " +
      "fields.");
  }
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
