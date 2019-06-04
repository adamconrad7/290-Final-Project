
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3069;

var usersArr = require('./userData.json');

app.engine('handlebars', exphbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//Catches root path and serves all twits:
app.get('/', function (req, res) {
  console.log('responding to request');
    res.render('browsePage', {
      users: usersArr
    });
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
