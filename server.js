const express = require('express')
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const api = require('./server/routes/api');

const app = express();

//connect to mongodb
mongoose.connect('mongodb://root:root@ds159856.mlab.com:59856/claims');

//POST parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//set api routes
app.use('/api', api)

//Default routes 
app.get('*', (req ,res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'))
});

const port = process.env.PORT || '3000';
app.set('port',port);

//CREATE http server
const server = http.createServer(app);

//Listen
server.listen(port, () => console.log('Api running on localhost:' + port));