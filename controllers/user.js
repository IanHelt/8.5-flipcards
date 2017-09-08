const models = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  createUser: (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
    models.User.create({
      username: req.body.username,
      password: hash
        })
      });
    });
    return res.send('User created');
  },
  createDeck: (req, res) => {

    models.Deck.create({
    name: req.body.name,
    userId: req.params.id
      }).then((results) => {
      return res.json(results);
      });
    },
      toHome: (req, res) => {
        passport.serializeUser(function(user, done) {
          done(null, user.id);
    });
    }
}
