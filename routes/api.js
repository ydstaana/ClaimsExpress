var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Claim = require('../models/ClaimSchema.js');
var User = require('../models/UserSchema.js');
var Organization = require('../models/OrgSchema.js');
var Log = require('../models/LogSchema.js');
var moment = require('moment');
var jwt    = require('jsonwebtoken');
var secret = "claims-express";
var csv=require('csvtojson');


var fs = require('fs');

var multer = require('multer');
var result = "";
var storage = multer.diskStorage({ //multers disk storage settings
    
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage 
                }).single('file');

/*-------------------USER----------------*/
/* GET SINGLE User BY USERNAME PASSWORD */
router.get('/login/:username/:password', function(req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) return next(err);
    
    if(!user){
      res.json({success: false, message: 'Auth failed. User not found'});
    }
    else{

      if(user.password != req.params.password) {
        res.json({success: false, message: 'Auth failed. Incorrect password'});
      }
      else{
        
        const payload = {
          id : user._id,
          userType : user.userType,
          username : user.username,
          organization: user.organization
        }

        var token = jwt.sign(payload, secret, {
          expiresIn : 3600 // expires in 1 hour
        });


         res.json({
            id : user._id, 
            success: true,
            message : "Token generated",
            token : token
         });
      }
    }
  });
});

/* GET ALL ORGANIZATION */
router.get('/organization', function(req, res, next) {
  Organization.find(function (err, organizations) {
    if (err) return next(err);
    res.json(organizations);
  });
});

/* SAVE User */
router.post('/user', function(req, res, next) {
  console.log(req.body)
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    Organization.findByIdAndUpdate(post.organization,
       { $push: { users: post._id }
    }, function (err, org) {
      if (err) return next(err);
      console.log(org);
    });
    res.json(post);
  });
});

/*JWT Routes Middleware*/
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

 /** API path that will upload the files */
    router.post('/claim/upload', function(req, res) {
        upload(req,res,function(err){
            console.log(req.file);
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            else{
            csv()
              .fromFile(req.file.path)
              .on('json', (jsonObj) =>{
                jsonObj.insurer = req.decoded.id;
                new Claim(jsonObj).save(function (err, post) {
                  if (err) return err;
                  var log = {
                    user : req.decoded.id,
                    organization: req.decoded.organization,
                    message: " uploaded claim " + post._id,
                    date: moment().format()
                  }

                  Log.create(log, function(err, logs) {
                    Log.find()
                    .populate('user')
                    .exec(function (err, logs) {
                      console.log(JSON.stringify(logs, null, "\t"))
                    });
                  });
                  console.log(post);
                });
                
              })
              .on('done', (error) => {
                console.log('end');
              })
             res.json({error_code:0,err_desc:null});
            }
        });
    });
    
/* GET ALL Users */
router.get('/user', function(req, res, next) {
   User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE User BY ID */
router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});







/* UPDATE User */
router.put('/user/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User */
router.delete('/user/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*-------------------CLAIM----------------*/
/* GET ALL Claims */
router.get('/claim', function(req, res, next) {
  
  Claim.find(function (err, claims) {
    if (err) return next(err);
    res.json(claims);
  });
});

/* GET SINGLE Claim BY ID */
router.get('/claim/:id', function(req, res, next) {
  Claim.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    console.log(post);
    var log = {
      user : req.decoded.id,
      organization: req.decoded.organization,
      message: " viewed claim " + post._id,
      date: moment().format("L")
    }
    Log.create(log, function(err, logs) {
      if(err) return next(err);
    });
    res.json(post);
  });
});

/*LOCAL SEARCH CLAIM GIVEN ID AND INPUT*/
router.get('/claim/search/:id/:input', function(req, res, next) {
  Claim.find({$and: [{insurer: req.params.id}, {motorNo: new RegExp(req.params.input, "i")}]}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/user/claim/:id', function(req, res, next) {
  Claim.find({insurer: req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GLOBAL SEARCH CLAIM*/
router.get('/claim/search/:input', function(req, res, next) {
  Claim.find({motorNo: new RegExp(req.params.input, "i")}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Claim */
router.post('/claim', function(req, res, next) {
  req.body.insurer = req.decoded.id;
  Claim.create(req.body, function (err, post) {
    if (err) return next(err);
    var log = {
      user : req.decoded.id,
      organization: req.decoded.organization,
      message: " created claim " + post._id,
      date: moment().format()
    }

    Log.create(log, function(err, logs) {
      Log.find()
      .populate('user')
      .exec(function (err, logs) {
        console.log(JSON.stringify(logs, null, "\t"))
      });
    });
    res.json(post);
  });
});

/* UPDATE Claim */
router.put('/claim/:id', function(req, res, next) {
  Claim.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Claim */
router.delete('/claim/:id', function(req, res, next) {
  Claim.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*UPLOAD CLAIM */
router.post('/claim/upload', function(req,res, next){
  upload.array(req, res, function(err) {
    if(err) {
      console.log(err);
      return res.status(422).send("error");
    }
    //console.log(req.file.path);
    console.log('files', req.files);
    res.send(req.files);
    console.log(req.files);
    console.log(req.file);
    return res.send("Upload complete");
  })
})

/*-------------------ORGANIZATION----------------*/

/* GET SINGLE Organization BY ID */
router.get('/organization/:id', function(req, res, next) {
  Organization.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*SEARCH FOR ORGANIZATION*/
router.get('/organization/search/:input', function(req, res, next) {
  Organization.find(
    {name: new RegExp(req.params.input, "i")}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ORGANIZATION */
router.post('/organization', function(req, res, next) {
  Organization.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ORGANIZATION */
router.put('/organization/:id', function(req, res, next) {
  Organization.findByIdAndUpdate(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ORGANIZATION */
router.delete('/organization/:id', function(req, res, next) {
  Organization.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*-------------------LOGS----------------*/

router.get('/user-logs', function(req, res, next) {
  switch(req.decoded.userType){
    case "ADMIN":
      Log.find()
      .populate('user')
      .exec(function (err, logs) {
        res.json(logs);
      });
      break;
    case "ENCODER":
      Log.find({user : req.decoded.id})
      .populate('user')
      .exec(function (err, logs) {
        res.json(logs);
      });
      break;
    case "ORGANIZER":
      Log.find({user : req.decoded.id})
      .populate('user')
      .exec(function (err, logs) {
        res.json(logs);
      });
      break;
    default:
      res.send("Default");
  }
});


router.get('/org-logs', function(req, res, next) {
  console.log(req.decoded.organization)
  Log.find({organization : req.decoded.organization})
    .populate('user')
    .exec(function (err, logs) {
      res.json(logs);
    });
});

module.exports = router;