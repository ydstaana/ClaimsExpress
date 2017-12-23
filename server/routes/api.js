const express = require('express')
const router = express.Router();

var Claim = require('../models/ClaimSchema');
var User = require('../models/UserSchema');

router.get('/', (req,res) => {
	res.send('api works');
});

/*____________________CLAIMS____________________*/
router.get('/claims', (req,res) => {
	Claim.find()
	    .exec(function(err, claims) {
	        if(err) {
	            res.send(err);
	        } else {
	            if(!claims) {
	                res.send({ "message" : "No Claims Yet" });
	            } else {
	                res.send(claims);
	            };
	        };
	    })
})

router.post('/claims', (req,res) => {
	Claim.create({
        name : req.body.name,
        license: req.body.license
    }, function(err, claims) {
        console.log(req.body);
        if (err)
            res.send(err);
       	res.send(claims);
    });
})

router.delete('/claims', (req,res) => {
	Claim.remove({
        _id : req.params.claim_id
    }, function(err, claim) {
        if (err)
            res.send(err);
        else
        	res.send(claim);
    });
})

module.exports = router;