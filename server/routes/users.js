var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("in users router");
    res.send("coming from users router...")

});

router.get('/login', function(req, res, next){
    console.log("Logging in...");
    res.send("coming from users login...")
    

});


module.exports = router;
