var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const dbdata = require('../oracleService')

router.get('/', function(req, res, next){
    console.log("in users router");
    res.send("coming from users router...")

});

router.get('/login/:email/passw/:passw', (req, res) =>{
    console.log("Logging in...");
    console.log(req.params);
    dbdata.getUserbyEmail(req.params.email, req.params.passw).then((data) => {
        console.log(JSON.stringify(data.rows)); 
        if(data.rows.length > 0) {
            //res.send(true);
            res.redirect("/home")
        }else{
        res.send(false);
    }
    }).catch((error) => {
        console.log(error)
         res.send(false);
    });
    
    

});

router.post('/login', function(req, res, next){
    console.log("Logging in...");
    res.send("coming from users login...")
    

});


module.exports = router;
