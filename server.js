var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const mongoose = require('mongoose')
const mongoDB = process.env.MONGOLAB_URI;
var Temperature = require('./models/temperatures.js')

var port = process.env.PORT || 8080; 

app.use(cors());
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  res.status(500).send(); 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end();
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {
  useMongoClient: true
});


const locations = [
	{
		location: 'Helsinki'
	},
	{
		location: 'New York'
	},
	{
		location: 'Amsterdam'
	},
	{
		location: 'Dubai'
	},
	{
		location: 'Tokyo'
	}
];

app.get("/temperatures", (req, res) => {
	Temperature.find(function(err, temperatures) {
		if(err)
			res.send(err)
		res.json(temperatures);
	}); 
});

app.get("/locations", (req, res) => {
 res.json(locations);
});

app.post("/temperatures", (req, res) => {
	var data = new Temperature(req.body);
	const array = locations.map((x) => x.location);
	if (!array.includes(req.body.location)) {
		res.json({"Error": "Invalid location"});
		return;
	}
	if (!(!isNaN(parseFloat(req.body.temperature)) && isFinite(req.body.temperature))) {
		console.log(req.body.temperature);
		res.json({"Error": "Temperature is not a number"});
		return;
	}
	data.save(function(err) {
		if(err)
			res.send(err);
		res.json(req.body);
	});
});

app.listen(port, () => {
	console.log("Server started on " + port);
});