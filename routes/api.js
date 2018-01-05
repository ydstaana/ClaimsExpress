var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Claim = require('../models/ClaimSchema.js');
var User = require('../models/UserSchema.js');
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
  User.find({username: req.params.username,password:req.params.password}, function (err, post) {
    if (err) return next(err);
    req.session.currUser = post[0]._id;
    req.session.currUserName = post[0].username;
    console.log(req.session.currUserName);
    res.json(post);
  });
});


/* SAVE User */
router.post('/user', function(req, res, next) {
  console.log(req.body)
  User.create(req.body, function (err, post) {
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
      userId: req.session.currUser,
      userName: req.session.currUserName,
      message: " created a claim",
      date: moment().format()
    }

    Log.create(log, function(err, logs) {
      if(err) return next(err);
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

/*-------------------LOGS----------------*/

router.get('/logs', function(req, res, next) {
  
  Log.find(function (err, logs) {
    if (err) return next(err);
    res.json(logs);
  });
});
module.exports = router;