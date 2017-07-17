var express = require('express')
var router = express.Router()

const Index = require('../models');

router.get('/', function(req, res, next) {
  let userSession = req.session.user
  res.render('index', {userSession: userSession, pageTitle: 'Index Page'})
})

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router
