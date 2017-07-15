var express = require('express')
var router = express.Router()

const Subject = require('../models');

router.get('/', function (req, res) {
  Subject.Subject.findAll({
    order: [['subject_name', 'ASC']],
    include: [Subject.Teacher]
  })
  .then(data => {
    // console.log(data.Teachers[0].id);
    res.render('subject', {dataSubject: data});
  })
})

router.get('/add', function(req,res){
  res.render('subject-add')
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
   res.render('subject-edit',{data:rows})
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
    console.log(data);
    res.render('subject-enrolledstudents', {dataSubject: data});
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
       res.render('subject-givescore', {data: datasiswa, dataSubject: datasubject})
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
