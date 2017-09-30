var express = require('express');
var mongoose = require('mongoose');
const urlRegex = require('url-regex');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//DB Connection
mongoose.connect(process.env.DB_STRING);

//Initialisation of Models
require('./models/Link'); //Build Link Class

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//Deal with Redirections for URL shortener
app.get("/:id", async function(req, res){
  var pattern = /[^0-9]/g;
  if (pattern.test(req.params.id)) {
      //Non-numeric value received
      res.json({error: "Not a valid redirection URL"});
      } else {
        var _id = Number(req.params.id);
        const Link = mongoose.model('links');
        var link = await Link.findOne({short: _id});
        if (link) {
          res.redirect(link.actual);
            } else {
              res.json({error: "Not redirection information found, please re-check URL"});
            } 
      }
});

//Route for URL shortener service
app.get("/api/shortener/:url(*)", function (req, res) {
  var pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  var _url = req.params.url.trim();
  if (urlRegex({exact: true}).test(_url)) {
        //Valid URL
        const Link = mongoose.model('links');
        pattern = /[/]+$/g;
        _url = _url.replace(pattern, '');
        var link = Link.findOneOrCreate({actual: _url},  {actual: _url}).then(function(data){
          res.send({shortURL: data.shortURL, redirectsTo: data.redirectsTo});
        });
      } else {
        //Invalid URL
        res.json({error: "Not a valid URL: " + _url});
      }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});