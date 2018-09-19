// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
let bodyParser = require("body-parser");

// *************************************************************
// comment out these two lines when ready to be deployed
// necessary b/c port keeps changing when server is restarted
let developmentPort = 3000;
process.env.PORT = developmentPort;
// *************************************************************

// parses HTTP encodings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// GET /api/whoami
app.get("/api/whoami", (req, res) => {
  /*
    x-forwarded-for: client, proxy1, proxy2, proxy3
  Explanation: 'x-forwarded-for' (which is a string) provided a comma separated list of IP addresses,
  with the left-most being the original client. Each subsequent address represents each
  proxies that passed the request(req) along.
  */

  // console.log('To see the request, all its details (including headers)', req);

  let ip =
    (req.headers["x-forwarded-for"] || "").split(",").shift() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  let clientDetails = {
    ipaddress: ip,
    language: req.headers["user-agent"],
    software: req.headers["accept-language"]
  };

  res.json(clientDetails);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
