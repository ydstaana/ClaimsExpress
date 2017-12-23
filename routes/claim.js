var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Claim = require('../models/ClaimSchema.js');



/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Claim.find(function (err, claims) {
    if (err) return next(err);
    res.json(claims);
  });
});

/* GET SINGLE BOOK BY ID */
// router.get('/:id', function(req, res, next) {
//   Book.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  Claim.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// /* UPDATE BOOK */
// router.put('/:id', function(req, res, next) {
//   Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE BOOK */
// router.delete('/:id', function(req, res, next) {
//   Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;