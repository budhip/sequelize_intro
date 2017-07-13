var express = require('express')
var router = express.Router()
var Sequelize = require('sequelize')

const Student = require('../models');


router.get('/', function (req, res) {
  Student.Student.findAll()
  .then(data => {
    res.render('student', {dataStudent: data, msg: ""});
  })
  .catch(Sequelize.ValidationError, function (err) {
    res.render('student', {dataStudent:data, err: err})
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
  .catch(Sequelize.ValidationError, function (err) {
    // console.log(`ini hasil ${err.errors[0].message}`);
    // return res.status(422).send(err.errors);
    Student.Student.findAll()
    .then(data => {
      res.render('student', {dataStudent: data, msg: err.errors[0].message});
    })
  })
});

router.get('/edit/:id', function(req, res) {
  Student.Student.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    // console.log(data.id);
    res.render('student-edit', {data:data})
  })
})

router.post('/update/:id', function(req, res) {
  Student.Student.update({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    jurusan : req.body.jurusan
  },{
    where: {
      id : req.params.id
    }
  })
  .then(function(){
    res.redirect('/student')
  })
})

router.get('/delete/:id', function(req, res) {
  Student.Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.redirect('/student');
  })
})

module.exports = router
