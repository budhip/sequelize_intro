var express = require('express')
var router = express.Router()

const Models = require('../models')
const genSalt = require('../helpers/generatesalt');

router.get('/', function(req, res, next) {
  res.render('login', {pageTitle: 'Login Page'})
})

router.post('/', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  Models.User.find({
    where: {username: username}
  })
  .then(user=> {
    var saltUserLogin = user.salt
    var passwordUserLogin = req.body.password

    var getPasswordUser = genSalt.createHash(passwordUserLogin, saltUserLogin)
    // console.log('ini password dari form    ',getPasswordUser);
    // console.log('ini password dari database',user.password);
    if(user.password == getPasswordUser) {
      req.session.user = {
        username : username,
        role: user.role
      }
      res.redirect('/dashboard')
    } else {
      res.send('Maaf password salah')
    }
  })
  .catch(err => {
    res.redirect('/login')
  })
})

module.exports = router;
