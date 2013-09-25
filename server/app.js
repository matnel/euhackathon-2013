var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use('/ui', express.static( __dirname + '/../ui'  ) );

var redis = require('redis');
var db = redis.createClient();

require('./fill.js').db_init( db );
require('./fill.js').clean( db );

app.post('/response/:id', function(req, res){
	var id = req.params.id;
	db.get('answer-' + id, function(err, reply) {
		console.log( reply );
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
  		reply.id = id;

  		res.setHeader('Content-Type', 'text/json');
  		res.end( JSON.stringify( reply ) );
  } );
});

// [{alpha: "a", amount: 3}, {alpha: "b", amount: 10}, {alpha: "c", amount: 4}]
// [[1, 30], [3, 29], [8, 5]]



app.listen(8000);


console.log("server ok");