const express = require("express");
const fs = require("fs");
const router = express.Router();
var jsonQuery = require('json-query')
var _ = require("underscore");
const fileLocation = "./data/memos.json";
//const dbdata = require('../oracleService')
const dbdata = require('../pgService')

// ---------------------------------------------------------------------
// GET ALL MEMOS
// ---------------------------------------------------------------------


router.get('/api/getallcourses', function (req, res) {
  dbdata.getAllCourses().then((data) => {

    if (data.rows.length > 0) {
      courses = data.rows
      res.json(courses);
    } else {
      console.log("No courses found")
      res.json(null);
    }

  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});

router.get("/api/gethandicap", isLoggedIn, (req, res) => {

  dbdata.getHandicap(req.user.id).then((data) => {

    console.log("in handicap route..." + data.rows[0]);
    res.json(data.rows[0]);
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  });

});

router.get("/api/isloggedin", isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, name: req.user.full_name, isAdmin: req.user.is_admin })
  } else {
    res.json({ loggedIn: false })
  }
});

router.post("/api/getholes", isLoggedIn, (req, res) => {
  dbdata.getHoles(req.body.courseId).then((data) => {
    console.log("sds" + JSON.stringify(data.rows));
    res.json(data.rows)
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  });
});


router.post("/api/addcourse", (req, res) => {
  dbdata.insertCourse(req.body.courseName, req.body.tee, req.body.country).then((response) => {
    console.log("after inserting course : " + JSON.stringify(response));
    res.json("true");
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});

/*rowData: [
    { rowname: "Par", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" },
    { rowname: "Hcp", h1: "", h2: "", h3: "", h4: "", h5: "", h6: "", h7: "", h8: "", h9: "", h10: "", h11: "", h12: "", h13: "", h14: "", h15: "", h16: "", h17: "", h18: "" }
]*/

router.post("/api/addholes", (req, res) => {
  //holes = [{3, 1, 5, 7},{3, 2, 5, 4},.., {cid: 3, h: 18, p:4, hc: 11} ]
  let rows = req.body.rowData;

  let courseId = req.body.courseId;
console.log(JSON.stringify(req.body));
  let holes = [];
  console.log("course id " + req.body.courseId )
  for (i = 1; i < 19; i++) {
    par = rows[0]["h" + i];
    hcp = rows[1]["h" + i];
    hole = i;
    hole = [ courseId, hole, par, hcp ];
    holes.push(hole);
  }
  dbdata.insertHoles(holes).then((response) => {
    res.json("ok");
  }).catch((error) => {
    console.log(error);
    res.status(500);
    res.json({ error: error });
  })
});


//------------------------------------------------------------------

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  // console.log(JSON.stringify(req))
  if (req.isAuthenticated())

    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

// ---------------------------------------------------------------------
// EXPORT MODULE
// ---------------------------------------------------------------------
module.exports = router;