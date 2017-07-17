var express = require('express')
var router = express.Router()

const Index = require('../models');

router.get('/', function (req, res) {
  res.render('index', {pageTitle: 'Welcome To School'})
})

module.exports = router
