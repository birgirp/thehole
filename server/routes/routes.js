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
  
      console.log("datarows " + JSON.stringify(data.rows));
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
  



router.get("/api/getMemos",  (req, res) => {
     
     dbdata.getAllNotes().then((data) => {
        res.json(data.rows)
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    });

});

router.get("/api/gethandicap", isLoggedIn, (req, res) => {

    dbdata.getHandicap(req.user.id).then((data) =>{

        console.log("in handicap route..." + data.rows[0]);
        res.json(data.rows[0]);
    }).catch((error) => {
        console.log(error)
        res.status(500);
        res.json({error: error});
    });
   
});

router.get("/api/isloggedin", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({loggedIn: true, name: req.user.full_name,  isAdmin: req.user.is_admin })
    } else {
        res.json({loggedIn: false })
    }
});
// ---------------------------------------------------------------------
// DELETE MEMOS
// ---------------------------------------------------------------------
router.delete("/api/deleteMemos", isLoggedIn, (req, res) => {
    let idsToDelete =  req.body;
    ids = idsToDelete.map(item => {
        return	item = [item]; 
    }); 


    ids.map(item => {
        console.log(item)
    })

    console.log("ids to delete: "+ ids);

    dbdata.deleteNotes(ids).then((data) => {
        console.log(JSON.stringify(data));  
        res.json(data)
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    });

   // res.send("allt i godu");
});

// ---------------------------------------------------------------------
// CREATE A NEW MEMO
// ---------------------------------------------------------------------
router.post("/api/createMemo", isLoggedIn, (req, res) => {
//-----------------------------------------------------------------------------------
    console.log("about to insert0");
    dbdata.addNewNote(req.body.title, req.body.contents ).then((data) => {
        console.log(JSON.stringify(data));  
        res.json("allt i godu")
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    })
});

// ---------------------------------------------------------------------
// VIEW A MEMO


 router.get("/api/viewMemo/:id", isLoggedIn, (req, res) => {
    
    dbdata.getNotebyId(parseInt(req.params.id)).then((data) => {
        console.log(JSON.stringify(data.rows));  
        res.json(data.rows)
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    });
});

// ---------------------------------------------------------------------
// UPDATE A MEMO
// ---------------------------------------------------------------------


router.put("/api/updateMemo", (req, res) => {

    console.log("about to update");
    dbdata.updateNote( parseInt(req.body.id), req.body.title, req.body.contents ).then((data) => {

        res.json("ok")
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
         
    })
        
       
    //--------------------------------------------------------
    /* fs.readFile(fileLocation, "utf8", (err, memos) => {  
    let parsedMemos = JSON.parse(memos);
    

        let newMemo = {
            id: parseInt(req.body.id),
            name: req.body.title,
            contents: req.body.contents
        }

  
        var index = parsedMemos.map(memo => { return memo.id; }).indexOf( parseInt(req.body.id));

        console.log("index: "+ index);
        parsedMemos.splice(index, 1, newMemo );


        // add the new version of the note


      fs.writeFile(fileLocation, JSON.stringify(parsedMemos), (err) => {
            if (err) {
                throw err;
            } else {
                res.send("allt i godu");
            }
        });

    });
    */
   
});
//-----------------------------------------------------------------------------


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("verify user login...")
    // if user is authenticated in the session, carry on 
   // console.log(JSON.stringify(req))
    if (req.isAuthenticated())
        console.log(req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}



// ---------------------------------------------------------------------
// EXPORT MODULE
// ---------------------------------------------------------------------
module.exports = router;