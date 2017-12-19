// const express = require('express')
// const app = express()
// const mongo = require('mongodb')
// const bodyParser = require('body-parser')
// const MongoClient = mongo.MongoClient;

// //svar db = require('./model/db')
// var obj = require('./backend/model/obj')
// var myDb	

// //app.get('/', (req,res) => res.send("Hello World"))
// app.use(bodyParser.urlencoded({extended: true}))

// MongoClient.connect('mongodb://root:root@ds159856.mlab.com:59856/contactlist', (err,database) => {
// 	if(err) return console.log(err)
// 	myDb = database.db('contactlist')
// 	app.listen(3000, () => console.log("Connected to server at port 3000"))
// })

// app.get('/', (req,res) => {
// 	res.sendFile(__dirname + 'public/view/Claim.html')
// })
// app.post('/add', (req,res) => {
// 	myDb.collection('claim').save(req.body, (err, result) => {
// 		if(err) return console.log(err)
// 		console.log('saved to db')
// 		res.redirect('/')
// 	})
// })

var app = angular.module("myApp", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider

    .when("/", {
            templateUrl: "view/Claim.html"
        })
    .otherwise({
			redirectTo : "/"
	})

}])

