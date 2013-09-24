var express = require('express');
var app = express();

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.use('/ui', express.static( __dirname + '/../ui'  ) );

app.listen(8000);
console.log("server ok")