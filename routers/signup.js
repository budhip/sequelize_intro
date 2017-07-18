var express = require('express')
var router = express.Router()

const Models = require('../models')

router.get('/', function(req, res, next) {
  res.render('signup', {pageTitle: 'Sign Up Page'})
})

router.post('/', function (req, res) {
  console.log('masuk gak ya');
  Models.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.optionrole
  })
  .then(function() {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
