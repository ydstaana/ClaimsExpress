module.exports = function(app) {
    var objectId        = require('mongodb').ObjectID;
    var Claim = require('../model/obj.model')


    app.get('/api/getAllClaims', function(req, res) {

        Claim.find({})
            .sort({
                name : 'ascending'
            })
            .exec(function(err, claims) {
                if(err) {
                    res.send(err);
                } else {
                    if(claims.size == 0) {
                        res.send({ "message" : "No entries yet" });
                    } else {
                        res.status(200).send(claims);
                    };
                };
            });

    });

    app.post('/api/addClaim', function(req, res) {

        var newClaim          = new Claim();
        newClaim.name         = req.body.name;
        newClaim.email  = req.body.email;
        newClaim.number  = req.body.number;

        newClaim.save(function(err, claim) {
            if(err) {
                res.send({ "message" : "Error in saving new patient!" });
            } else {
                if(!claim._id) {
                    res.send({ "message" : "Error in creating a new patient" });
                } else {
                    res.send(claim);
                };
            };
        });
        
    });

}