var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//const dbdata = require('../oracleService')
const dbdata = require('../pgService')

router.get('/', function (req, res, next) {
  console.log("in users router");
  res.send("coming from users router...")

});


router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user) {
    if (err) {
      res.status(err.statusCode).send(err);
      return;
    }
    req.logIn(user, function () {
      console.log("user logging in: " + JSON.stringify(user));
      res.status(200).send({
        user
      });
    });
  })(req, res, next);
});



passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function (req, username, password, done) {
    dbdata.getUserbyEmail(username, password).then((data) => {

      console.log("datarows " + JSON.stringify(data.rows[0]));
      if (data.rows.length > 0) {
        console.log("success")
        user = data.rows[0]
        console.log("user: " + user.isadmin)
        return done(null, user);
      }
      console.log("unknown user")
      return done(null, false);
    }).catch((err) => {
      console.log("fail", err)
      //if (err) {
      //    return done(err);
      //}  
      return done(null, false);
    })
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get('/getAllUsers', function (req, res) {
  dbdata.getAllUsers().then((data) => {

    console.log("datarows " + JSON.stringify(data.rows));
    if (data.rows.length > 0) {
      console.log("success")
      users = data.rows
      res.json(users);
    }
    console.log("No users found")
    res.json(null);
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({error: error});
  })
});



module.exports = router;
