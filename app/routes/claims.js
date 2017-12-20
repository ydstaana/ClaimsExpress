var Claim       = require('../models/ClaimSchema');
module.exports = function(app) {

    var objectId       = require('mongodb').ObjectID;
    

    app.get('/api/getAllClaims', (req,res) => {
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

    app.post('/api/addClaim', (req,res) => {
    	Claim.create({
            name : req.body.name,
            license: req.body.license
        }, function(err, claims) {
            if (err)
                res.send(err);
           	res.send(claims);
        });
    })

    app.delete('/api/removeClaim/:claim_id' , (req,res) => {
    	Claim.remove({
            _id : req.params.claim_id
        }, function(err, claim) {
            if (err)
                res.send(err);
            else
            	res.send(claim);
        });
    })

    app.get('/404', function(req, res) {
        res.sendfile('./public/views/404.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    

};