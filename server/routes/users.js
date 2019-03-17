var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//const dbdata = require('../oracleService')
const dbdata = require('../pgService')

router.get('/', function(req, res, next){
    console.log("in users router");
    res.send("coming from users router...")

});


//router.post('/login', passport.authenticate('local-login', { successRedirect: '/home',  failureRedirect: '/fail'}));

router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user) {
        if (err) {
          console.log("sdfsfsdf")
            res.status(err.statusCode).send(err);
            return;
        }
        req.logIn(user, function () {
            console.log("user: " + JSON.stringify(user))
            res.status(200).send({
                user
            });
        });
    })(req, res, next);
});



passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log("xxxxxxxxxxxxx")
      dbdata.getUserbyEmail(username, password).then((data) => {

        console.log(JSON.stringify(data.rows[0])); 
        if(data.rows.length > 0) {
         // console.log("success")
            user = {
                id: data.rows[0][0],
                name: data.rows[0][1],
                email: data.rows[0][2],
                handicap: data.rows[0][3],
                isadmin: (data.rows[0][4] === 1 ? true : false)

            }
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
    
      /*
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
      */

    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

   /*router.get('/login/:email/passw/:passw', (req, res) =>{
     console.log("Logging in...");
    console.log(req.params);
    dbdata.getUserbyEmail(req.params.email, req.params.passw).then((data) => {
        console.log(JSON.stringify(data.rows)); 
        if(data.rows.length > 0) {
           console.log("rows : " + data.rows.length );
            res.send(true);
        //    res.redirect("/home")
        }else{
        res.send(false);
    }
    }).catch((error) => {
        console.log(error)
         res.send(false);
    });
    });*/

/*
dbdata.getAllUsers().then((data) => {
    //  console.log(JSON.stringify(data.rows));  
      res.json(data.rows)
  }).catch((error) => {
      console.log(error)
       res.status(500);
       res.json({error: error});
  });
   
*/



module.exports = router;
