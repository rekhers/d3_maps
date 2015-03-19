var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 3000;


http.listen(port);


app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('pages/index.ejs');
	app.use("/data", express.static(__dirname + '/data'));
	
});