var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Claim = require('../models/ClaimSchema.js');



/* GET ALL Claims */
router.get('/', function(req, res, next) {
  Claim.find(function (err, claims) {
    if (err) return next(err);
    res.json(claims);
  });
});

/* GET SINGLE Claim BY ID */
router.get('/:id', function(req, res, next) {
  Claim.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Claim */
router.post('/', function(req, res, next) {
  Claim.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Claim */
router.put('/:id', function(req, res, next) {
  Claim.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Claim */
router.delete('/:id', function(req, res, next) {
  Claim.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;