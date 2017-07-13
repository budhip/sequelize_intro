var express = require('express')
var router = express.Router()
var Sequelize = require('sequelize')

const Student = require('../models');


router.get('/', function (req, res) {
  Student.Student.findAll()
  .then(data => {
    res.render('student', {dataStudent: data});
  })
})

router.get('/add', function(req,res){
    res.render('student-add', {errmsg: ''})
 })

router.post('/', function(req, res){
   Student.Student.findOne({
      where:{
       email:req.body.email
      }
    })
  .then(function(result){
    if(!result){
      Student.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        jurusan: req.body.jurusan,
      })
      .then(function(){
        res.redirect('/student')
      })
      .catch(function(err){
       res.render('student-add', {errmsg: err.message});
      })
    } else {
      res.render('student-add', {errmsg: 'Email sudah ada yang pakai om'});
     }
    })
  })

  router.get('/edit/:id', function(req, res){
   Student.Student.findById(req.params.id)
   .then(function(rows) {
     res.render('student-edit',{data:rows, errmsg: ''})
   })
 })

 router.post('/edit/:id', function(req, res){
   Student.Student.findOne({
     where:{
      email: req.body.email
     }
   })
.then(function(result){
  if(!result || req.body.email === req.body.emailOri){
    Student.Student.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      jurusan: req.body.jurusan,
    },{
      where:{
        id:req.params.id
      }
    })
    .then(function(){
      res.redirect('/student');
    })
    .catch(function(err){
      Student.Student.findById(req.params.id)
      .then(function(rows){
        res.render('student-edit',{data:rows, errmsg: err})
      })
    })
  } else {
    res.send('email sudah ada yang pakai om')
  }
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
