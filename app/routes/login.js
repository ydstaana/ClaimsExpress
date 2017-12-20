var User       = require('../models/UserSchema');
module.exports = function(app) {

    var objectId  = require('mongodb').ObjectID;

    app.post('/api/findUser/', function(req, res) {
        
        var u = req.body.username;
        var p = req.body.password;

        User.findOne({
            "username"  :   u,
            "password"  :   p
        })
        .exec(function(err, user) {
            if(err) {
                res.send(err);
            } else {
                if(!user) {
                    res.send({"message" : "User does not exist!"});
                } else {
                    console.log("User exists");
                    req.session.currUser = user;
                        
                    res.send(user);
                };
            };
        });             

    });

   

    app.post('/api/createUser', (req,res) => {
        User.create({
            username : req.body.username,
            password : req.body.password
        }, function(err, user) {
            if (err)
                res.send(err);
            res.send(user);
        });
    })

};