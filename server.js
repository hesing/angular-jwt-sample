var express =require("express");
var faker =require("faker");
var jwt =require("jsonwebtoken");
var expressJwt = require('express-jwt');
var bodyParser =require("body-parser");
var cors =require("cors");

var app = express(),
	port = process.env.port || 3000,
	mySecret = "mysecret";

// temp user
var user = {
	username: "hemant",
	password: "123"
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(expressJwt({ secret: mySecret}).unless({path: ['/login']}));

function authenticate(req, res, next){
	if(req.body.username !== user.username || req.body.password !== user.password){
		res.status(401).send("username or password incorrect");
	}
	next();
}

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.post("/login", authenticate, function(req, res){
	var token = jwt.sign({
		username: req.body.username
	}, mySecret);

	res.send({
		token: token,
		user: user
	});
});

app.get("/me", function(req, res){
	res.send(req.user);
});

app.get("/random-user", function(req, res){
	var user = faker.helpers.contextualCard();
	res.json(user);
});

app.listen(port, function(){
	console.log("browse http://localhost:3000");
});