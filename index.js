'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

passport.use(new BasicStrategy(function (username, password, done) {
  models.User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    console.log(user);
    if (!user) {
      return done(null, false);
    } else if (user.password !== password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }).catch((error) => {
    console.log(error);
  });
}));


app.listen(3000);
