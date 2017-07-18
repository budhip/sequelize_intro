var express = require('express');
var router = express.Router();
var score = require ('../helpers/score_helper');

const Subject = require('../models');
const userauth = require('../helpers/userauth.js');

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', function (req, res) {
  Subject.Subject.findAll({
    order: [['subject_name', 'ASC']],
    include: [Subject.Teacher]
  })
  .then(data => {
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    // console.log(data.Teachers[0].id);
    res.render('subject', {dataSubject: data, pageTitle: 'Subject Page', rolesession: userSession});
  })
})

router.get('/add', function(req,res){
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
  res.render('subject-add', {pageTitle: 'Add Subject Page', rolesession: userSession})
 })

router.post('/', function (req, res) {
  Subject.Subject.create(req.body)
  .then(function() {
    res.redirect('/subject')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', function(req, res){
 Subject.Subject.findById(req.params.id)
 .then(function(rows) {
   let userSession = req.session.user
   let getUserAuth = userauth.userRole(userSession.role)
   res.render('subject-edit',{data:rows, pageTitle: 'Edit Subject Page', rolesession: userSession})
 })
})

router.post('/edit/:id', function(req, res) {
  Subject.Subject.update(req.body, {
    where : {
      id:req.params.id
    }
  })
  .then(function() {
    res.redirect('/subject')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res) {
  Subject.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.redirect('/subject');
  })
})

router.get('/:id/enrolledstudents', function (req, res) {
  Subject.Detailstudent.findAll({
    where: {
      SubjectId: req.params.id
    },
    include: [{all:true}],
    order: [['Student', 'first_name', 'ASC']],
  })
  .then(data => {
    // console.log('fjsafsdkgsgkjhskjghdkjsghkjghs',data[0].score);
    var dataTemp = [];
    for (var i = 0; i < data.length; i++) {
      dataTemp.push(data[i].score)
    }
    console.log(dataTemp);
    let userSession = req.session.user
    let getUserAuth = userauth.userRole(userSession.role)
    res.render('subject-enrolledstudents', {dataSubject: data, pageTitle: 'Enrolled Students Page', rolesession: userSession, dataScore: score(dataTemp)});
  })
})

router.get('/:id/:ids/givescore', function (req, res) {
   Subject.Student.findAll({
     where: {
       id: req.params.id
     }
   })
   .then(datasiswa => {
     Subject.Subject.findAll({
       where: {
         id: req.params.ids
       }
     })
     .then(datasubject => {
       let userSession = req.session.user
       let getUserAuth = userauth.userRole(userSession.role)
       res.render('subject-givescore', {data: datasiswa, dataSubject: datasubject, pageTitle: 'Give Score Page', rolesession: userSession})
     })
   })
 })

 router.post('/:id/:ids/givescore', function (req, res) {
   Subject.Detailstudent.update({
     score: req.body.score,
   },{
     where: {
       StudentId: req.params.id,
       $and: {
         SubjectId: req.params.ids
       }
     }
   })
   .then(result => {
     res.redirect('/subject')
   })
 })

module.exports = router
