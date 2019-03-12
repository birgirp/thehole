var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const dbdata = require('../oracleService')

router.get('/', function(req, res, next){
    console.log("in users router");
    res.send("coming from users router...")

});




/*router.post('/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/'}));


passport.use(new LocalStrategy(
    function(username, password, done) {
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
    }
  ));*/

/*  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
*/
router.get('/login/:email/passw/:passw', (req, res) =>{
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
    
    

});



module.exports = router;
