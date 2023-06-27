// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const headerParserMiddleware = (req) => {
  let _headerJson = {}
  let _ipAddress = req?.socket?.remoteAddress
  let _software = req?.rawHeaders[Number(req?.rawHeaders.indexOf('User-Agent')) + 1];
  let _language = req?.rawHeaders[Number(req?.rawHeaders.indexOf('Accept-Language')) + 1];
  return _headerJson = {
    ipaddress: _ipAddress,
    language: _language,
    software: _software
  }
} 

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function (req, res) {
  res.json(headerParserMiddleware(req));
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
