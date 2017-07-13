var express = require('express')
var router = express.Router()

const Teacher = require('../models');

router.get('/', function (req, res) {
  Teacher.Teacher.findAll().then(data => {
    res.render('teacher', {dataTeacher: data});
  })
})

module.exports = router
