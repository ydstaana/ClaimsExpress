const express = require('express')
const app = express()
const mongo = require('mongodb')
const bodyParser = require('body-parser')
const MongoClient = mongo.MongoClient;

//svar db = require('./model/db')
var obj = require('./model/obj')
var myDb	

//app.get('/', (req,res) => res.send("Hello World"))
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://root:root@ds159856.mlab.com:59856/claims', (err,database) => {
	if(err) return console.log(err)
	myDb = database.db('claims')
	app.listen(3000, () => console.log("Connected to server at port 3000"))
})

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html')
})
app.post('/add', (req,res) => {
	myDb.collection('claim').save(req.body, (err, result) => {
		if(err) return console.log(err)
		console.log('saved to db')
		res.redirect('/')
	})
})
