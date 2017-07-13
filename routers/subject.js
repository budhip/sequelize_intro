var express = require('express')
var router = express.Router()

const Subject = require('../models');

router.get('/', function (req, res) {
  Subject.Subject.findAll().then(data => {
    res.render('subject', {dataSubject: data});
  })
})

module.exports = router
