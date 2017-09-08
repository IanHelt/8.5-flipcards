'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const models = require('./models');
const UserController = require('./controllers/user');
const session = require('express-session');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(session({
  secret: "chimp"
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy(function (username, password, done) {
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    console.log(username);
    console.log(password);
    console.log(user);
    if (!user) {
      return done(null, false);
    } else if (bcrypt.compareSync(password, user.password) === false) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }).catch((error) => {
    console.log(error);
  });
}));

app.get('/', passport.authenticate(['basic']), UserController.toHome);
app.post('/api/createUser', UserController.createUser);
//app.post
app.listen(3000);
