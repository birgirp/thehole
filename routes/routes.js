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
    res.json({ loggedIn: true, name: req.user.full_name, isAdmin: req.user.is_admin, userId: req.user.id })
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
    res.json(response.rows[0]);
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
  console.log("course id " + req.body.courseId)
  for (i = 1; i < 19; i++) {
    par = rows[0]["h" + i];
    hcp = rows[1]["h" + i];
    hole = i;
    hole = [courseId, hole, par, hcp];
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

router.post("/api/addholescores", (req, res) => {
  //scores = [{3, 1, 5, 7},{3, 2, 5, 4},.., {scoredardid, holeid, strokes, points} ]
  let rows = req.body.rowData;

  let courseId = req.body.courseId;
  console.log(JSON.stringify(req.body));
  let holes = [];
  console.log("course id " + req.body.courseId)
  for (i = 1; i < 19; i++) {
    par = rows[0]["h" + i];
    hcp = rows[1]["h" + i];
    hole = i;
    hole = [courseId, hole, par, hcp];
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

router.post("/api/addscorecard", (req, res) => {
  let courseId = req.body.courseId
  let tourId = req.body.tourId
  let roundNum = req.body.roundNum
  let playerId = req.body.playerId
  let roundDate = req.body.roundDate
  let handicap = req.body.handicap
  let status = req.body.status
 dbdata.insertScoreCard(tourId, roundNum, courseId, playerId, roundDate , handicap, status ).then((response)=> {
  res.json(response.rows[0].id)

 }).catch((error)=>{
  console.log(error);
  res.status(500);
  res.json({ error: error });
 })
});


router.post("/api/addtour", (req, res) => {
  const players = req.body.players;
  const courses = req.body.courses;
  const rounds = req.body.rounds;
  let tour_id = null;
  dbdata.insertTour(req.body.tourName, "Open", rounds).then((response) => {
    console.log("after inserting tour : " + JSON.stringify(response.rows[0].id));
    tour_id = response.rows[0].id;
    return dbdata.insertTourPlayers(tour_id, players);
  })
    .then(res2 => {
      console.log("after inserting tour players : " + JSON.stringify(res2));
      return dbdata.insertTourCourses(tour_id, courses);
    }).then(res3 => {
      console.log("after inserting tour courses : " + JSON.stringify(res3));
      res.json('ok')
    })
    .catch((error) => {
      console.log(error)
      res.status(500);
      res.json({ error: error });
    })
});

router.get("/api/getalltours", (req, res) => {
  dbdata.getAllTours().then((data) => {
    if (data.rows.length > 0) {
      tours = data.rows
      res.json(tours);
    } else {
      console.log("No tours found")
      res.json(null);
    }
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});

router.post("/api/gettourbyid", (req, res) => {
  dbdata.getTourById(req.body.tourId).then((data) => {
    if (data.rows.length > 0) {
      tour = data.rows[0]
      res.json(tour);
    } else {
      console.log("No tour found")
      res.json(null);
    }
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});


router.post("/api/getplayertours", (req, res) => {
  let playerId = req.body.playerId
  console.log("playerId " + playerId)
  dbdata.getPlayerTours(playerId).then((data) => {
    if (data.rows.length > 0) {
      tours = data.rows
      res.json(tours);
    } else {
      console.log("No tours found")
      res.json(null);
    }
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});

router.post("/api/gettourplayers", (req, res) => {
  let tourId = req.body.tourId
  dbdata.getTourPlayers(tourId).then((data) => {
    if (data.rows.length > 0) {
      players = data.rows
      res.json(players);
    } else {
      console.log("No players found")
      res.json(null);
    }
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })
});

router.post("/api/gettourcourses", (req, res) => {
  let tourId = req.body.tourId
  dbdata.getTourCourses(tourId).then((data) => {
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

router.post("/api/getscorecard", (req, res) => {

  let tourId = req.body.tourId
  let roundNum = req.body.roundNum
  let playerId = req.body.playerId
  res.json(null)

 /* dbdata.getScorecard(tourId, roundNum,playerId).then((data) => {
    if (data.rows.length > 0) {
      scores = data.rows
      res.json(scores);
    } else {
      console.log("No scores found")
      res.json(null);
    }
  }).catch((error) => {
    console.log(error)
    res.status(500);
    res.json({ error: error });
  })*/
});

/*
router.post("/api/addround", (req, res) => {
  let tourId = req.body.tourId;
  let rounds = parseInt(req.body.rounds);
  var i;
  for (i = 0; i < rounds; i++) {
    console.log(i);
    dbdata.insertTourRound(tourId).then((data) => {
      console.log("...")
    }).catch((error) => {
      console.log(error)
      res.status(500);
      res.json({ error: error });
    })
  }
});

router.post("/api/updateround", (req, res) => {
  let tourId = req.body.tourId;
  let rounds = parseInt(req.body.rounds);
  var i;
  for (i = 0; i < rounds; i++) {
    console.log(i);
    dbdata.insertTourRound(tourId).then((data) => {
      console.log("...")
    }).catch((error) => {
      console.log(error)
      res.status(500);
      res.json({ error: error });
    })
  }
});
*/



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