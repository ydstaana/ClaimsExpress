const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;

var db
db = MongoClient.connect('mongodb://root:root@ds159856.mlab.com:59856/claims', (err,database) => {
	if(err) return console.log(err)
	console.log(database.db('claims'))
	return database.db('claims')
})

module.exports = db
