var express = require('express')
var router = express.Router()

const Index = require('../models');

router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
