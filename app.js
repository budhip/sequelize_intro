const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


let app = express();

var index = require ('./routers/index')
var login = require ('./routers/login')
var dashboard = require ('./routers/dashboard')
var teacher = require ('./routers/teacher')
var subject = require ('./routers/subject')
var student = require ('./routers/student')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: '&*^*&#$^7sdfjgsdj78^&*usdfsgf',
  resave: false,
  saveUnitialized: true,
  cookie: {}
}))

app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/', index);

app.use('/teacher', teacher);
app.use('/subject', subject);
app.use('/student', student);

app.listen(3000)
