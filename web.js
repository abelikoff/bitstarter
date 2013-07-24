var express = require('express');
var app = express.createServer(express.logger());
var fs = require('fs');

app.get('/', function(request, response) {
    buf = fs.readFileSync("index.html");
    response.send(buf.toString());
});

app.get('/(images/[a-z][a-z0-9]*.png)', function(request, response) {
    file = request.url.substring(1);
    fs.exists(file, function(exists) {
        if (exists) {
            buf = fs.readFileSync(file);
            response.writeHead(200, {'Content-Type': 'image/png' });
            response.end(buf, 'binary');
        }
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
