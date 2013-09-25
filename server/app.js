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
	db.get('answer-' + id, function(err, data) {
		console.log( data );
  		data = JSON.parse( data );

  		var answer = req.body.answer;

  		if( ! (answer in data) ) {
  			console.log("set zero");
  			data[ answer ] = 0;
  		}
  		data[ answer ]++;

  		console.log( data );

  		var reply = [];
  		for( var a in data ) {
  			reply.push( {
  				'answer' : a,
  				'amount' : data[a]
  			} );
  		}

  		res.setHeader('Content-Type', 'text/json');
  		res.end( JSON.stringify( reply ) );

  		data = JSON.stringify( data );
  		db.set('answer-' + id, data);
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