var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use('/ui', express.static( __dirname + '/../ui'  ) );

var redis = require('redis');
var db = redis.createClient();

db.set('answer-1', "[1,2,3]" )
db.set('question-1', "[1,2,3]" )

app.post('/response/:id', function(req, res){
	var id = req.params.id;
	db.get('answer-' + id, function(err, reply) {
  		reply = JSON.parse( reply );

  		res.setHeader('Content-Type', 'text/json');
  		res.end( JSON.stringify( reply ) );
  		reply.push( req.body.answer );

  		reply = JSON.stringify( reply );
  		db.set('answer-' + id, reply);
  } );
});

app.get('/question/:id', function(req, res){
	var id = req.params.id;
	db.get('question-' + id, function(err, reply) {
  		reply = JSON.parse( reply );

  		res.setHeader('Content-Type', 'text/json');
  		res.end( JSON.stringify( reply ) );
  } );
});





app.listen(8000);


console.log("server ok");