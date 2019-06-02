
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3069;

app.use(express.static('public'));

//Catches root path and serves all twits:
app.get('/', function (req, res) {
  console.log(req.url);
    res.render('twitPage', {
      twits: twitArray,
      displayModal: true
    });
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
