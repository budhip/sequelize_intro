var express = require('express')
var router = express.Router()

const Teacher = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', function (req,res) {
  Teacher.Teacher.findAll({
    order: [['first_name', 'ASC']],
    include: [Teacher.Subject]
  })
  .then(data => {
    console.log(data);
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    res.render('teacher', {dataTeacher: data, pageTitle: 'Teacher Page', rolesession: userSession})
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/add', function(req,res){
  Teacher.Subject.findAll()
  .then(data => {
    console.log(data);
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    res.render('teacher-add', {data2: data, pageTitle: 'Add Teacher Page', rolesession:userSession})
  })
 })

router.post('/', function (req, res) {
  Teacher.Teacher.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.selectSubject || null
  })
  .then(function() {
    res.redirect('/teacher')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', function(req, res){
 Teacher.Teacher.findById(req.params.id, {include: [Teacher.Subject]})
 .then(function(rows) {
   Teacher.Subject.findAll()
   .then(dataSemua => {
     let userSession = req.session.user
     let getUserAuth = userauth.userRole(userSession.role)
     res.render('teacher-edit',{data:rows, data2: dataSemua, pageTitle: 'Edit Teacher Page', rolesession: userSession})
   })
 })
})

router.post('/edit/:id', function(req, res) {
  Teacher.Teacher.update({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    SubjectId : req.body.subject || null
  }, {
    where : {
      id:req.params.id
    }
  })
  .then(function() {
    res.redirect('/teacher')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res) {
  Teacher.Teacher.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.redirect('/teacher');
  })
})

module.exports = router
