var express = require('express')
var router = express.Router()

const Student = require('../models');


router.get('/', function (req, res) {
  Student.Student.findAll()
  .then(data => {
    res.render('student', {dataStudent: data});
  })
})

router.post('/', function(req, res) {
  Student.Student.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    jurusan : req.body.jurusan
  })
  .then(function(){
    res.redirect('/student')
  })
});

router.get('/edit/:id', function(req, res) {
  
})

router.post('/update/:id', function(req, res) {

})

module.exports = router
