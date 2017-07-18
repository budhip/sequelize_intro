var express = require('express')
var router = express.Router()
var Sequelize = require('sequelize')

const Student = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster' || req.session.user.role == 'teacher' || req.session.user.role == 'academic'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})


router.get('/', function (req, res) {
  Student.Student.findAll({
    order: [['first_name', 'ASC']]
  })
  .then(data => {
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    res.render('student', {dataStudent: data, pageTitle: 'Student Page', rolesession: userSession});
  })
})

router.get('/add', function(req,res){
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
    res.render('student-add', {errmsg: '', pageTitle: 'Add Student Page', rolesession: userSession})
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
     let userSession = req.session.user
     let getUserAuth = userauth.userRole(userSession.role)
     res.render('student-edit',{data:rows, errmsg: '', pageTitle: 'Edit Student Page', rolesession: userSession})
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

router.get('/edit/:id/addsubject', function(req, res){
  Student.Student.findById(req.params.id,{
    include: [Student.Subject]
  })
  .then(function(rows){
    Student.Subject.findAll()
    .then(function(dataSubject){
      console.log(rows);
      let userSession = req.session.user
      let getUserAuth = userauth.userRole(userSession.role)
      res.render('student-add-subject', {data:rows, data2: dataSubject, pageTitle: 'Add Subject To Student Page', rolesession: userSession})
    })
  })
})


router.post('/edit/:id/addsubject', function(req, res) {
  Student.Detailstudent.create({
    StudentId: req.params.id,
    SubjectId: req.body.selectSubject
  }, {
    where : {
      id:req.params.id
    }
  })
  .then(function() {
    res.redirect('/student')
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router
