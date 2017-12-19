const express = require('express')
const app = express()
const mongojs = require('mongojs')
const db = mongojs('contactlist', ['contactlist']);
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose   = require('mongoose');

const Claim  = require('./app/model/obj.model');

mongoose.connect('mongodb://localhost/contactlist')

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

require('./app/routes/claimRoute')(app);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});



// ROUTES

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});




// for claims
// router.route('/contactlist')
// .post(function(req, res) {

//         var claim = new Claim();      // create a new instance of the Bear model
//         claim.name = req.body.name;  // set the bears name (comes from the request)

//         // save the bear and check for errors
//         claim.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'claim created!' });
//         });

//     })
// .get(function(req, res) {
//         db.contactlist.find(function(err, claims) {
//             if (err)
//                 res.send(err);

//             res.json(claims);
//         });
//     });


// const samp   = require('./backend/model/obj'); // for routing
// require('./config/router.js')(app);
app.use('/api', router);
app.listen(3000);
console.log("Server running on port 3000");
exports = module.exports = app;