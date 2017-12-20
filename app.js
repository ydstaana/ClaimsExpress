const express = require('express')
const app = express()
const bodyParser = require('body-parser')



 
const mongo = require('mongodb')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended: true}))

app.use(router)

mongoose.connect('mongodb://root:root@ds159856.mlab.com:59856/claims')

/*app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html')
})*/
/*app.post('/add', (req,res) => {
	myDb.collection('claim').save(req.body, (err, result) => {
		if(err) return console.log(err)
		console.log('saved to db')
		res.redirect('/')
	})
})
*/