var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Claim = require('../models/ClaimSchema.js');
var User = require('../models/UserSchema.js');
var Organization = require('../models/OrgSchema.js');
var Log = require('../models/LogSchema.js');
var moment = require('moment');


/*-------------------USER----------------*/
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



/* GET SINGLE User BY USERNAME PASSWORD */
router.get('/login/:username/:password', function(req, res, next) {
  User.findOne({username: req.params.username,password:req.params.password}, function (err, post) {
    if (err) return next(err);
    req.session.currUser = post._id;
    req.session.currUserName = post.username;
    req.session.currUserType = post.userType;
    console.log(req.session.currUserName);
    res.json(post);
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
      userId: req.session.currUser,
      userName: req.session.currUserName,
      message: " viewed claim " + post._id,
      date: moment().format()
    }
    Log.create(log, function(err, logs) {
      if(err) return next(err);
    });
    res.json(post);
  });
});

/*SEARCH FOR CLAIM*/
router.get('/claim/search/:input', function(req, res, next) {
  Claim.find({$or : [
      {name: new RegExp(req.params.input, "i")},
      {license: new RegExp(req.params.input, "i")},
    ]}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Claim */
router.post('/claim', function(req, res, next) {
  Claim.create(req.body, function (err, post) {
    if (err) return next(err);
    var log = {
      user: req.session.currUser,
      message: " created a claim",
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
/*-------------------ORGANIZATION----------------*/
/* GET ALL ORGANIZATION */
router.get('/organization', function(req, res, next) {
  Organization.find(function (err, organizations) {
    if (err) return next(err);
    res.json(organizations);
  });
});

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

router.get('/logs', function(req, res, next) {
  switch(req.session.currUserType){
    case "ADMIN":
      Log.find()
      .populate('user')
      .exec(function (err, logs) {
        res.json(logs);
      });
      break;
    case "ENCODER":
      res.send("Encoder");
      break;
    case "ORGANIZER":
      res.send("Organizer")
      break;

    default:
      res.send("Default");
  }
});
module.exports = router;