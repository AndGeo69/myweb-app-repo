'use strict'

var express = require('express');
var os = require('os');
var app = express();

const host = "localhost";
const port = "8080";
const localhost = 'http://' + host + ':' + port + '/';

app.use(function (req, res, next) {
   res.header('X-XSS-Protection', 0);
   res.header('Access-Control-Allow-Origin', "*");
   next();
});

var server = app.listen(port, function () {
   var h = server.address().address
   var p = server.address().port
   console.log("Server is up and running really fast at http://%s:%s", h, p)
})

let version = "1.0";
let callCounter = 0;

app.get('/', function (request, response) {
    callCounter++;

    console.log("Received call from client...x" + callCounter);
    let totalmem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);

    const info = {
        platform: os.platform(),
        hostname: os.hostname(),
        architecture: os.arch(),
        cpuCount: os.cpus().length,
        memory: 'Total Memory: ' + totalmem + ' GB',
        version: version,
    };

    response.json(info);
});
