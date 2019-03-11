const express = require("express");
const fs = require("fs");
const router = express.Router();
var jsonQuery = require('json-query')
var _ = require("underscore");
const fileLocation = "./data/memos.json";
const dbdata = require('../oracleService')

// ---------------------------------------------------------------------
// GET ALL MEMOS
// ---------------------------------------------------------------------
router.get("/api/getMemos", (req, res) => {
  
  /*  fs.readFile(fileLocation, "utf8", (err, memos) => {
        console.log("Frá file: \n")
    })*/
   
   

    dbdata.getAllNotes().then((data) => {
      //  console.log(JSON.stringify(data.rows));  
        res.json(data.rows)
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    });
     

});

// ---------------------------------------------------------------------
// DELETE MEMOS
// ---------------------------------------------------------------------
router.delete("/api/deleteMemos", (req, res) => {
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


/*
    fs.readFile(fileLocation, "utf8", (err, memos) => {
        let parsedMemos = JSON.parse(memos);

        for (var i = 0; i < idsToDelete.length; i++) {
            let currentId = idsToDelete[i];
            console.log("currentid: " + currentId);
      
            var index = parsedMemos.map(memo => { return memo.id; }).indexOf(currentId);
            console.log("index: " + index);
            parsedMemos.splice(index, 1);
        }

        fs.writeFile(fileLocation, JSON.stringify(parsedMemos), (err) => {
            if (err) {
                throw err;
            } else {
                res.send("allt i godu");
            }
        });

    });*/
});



// ---------------------------------------------------------------------
// CREATE A NEW MEMO
// ---------------------------------------------------------------------
router.post("/api/createMemo", (req, res) => {
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


//---------------------------------------------------------------------------------
   /* fs.readFile(fileLocation, "utf8", (err, memos) => {
        let parsedMemos = JSON.parse(memos);
        let lastMemo = parsedMemos[parsedMemos.length - 1];

        let newMemo = {
            id: lastMemo.id + 1,
            name: req.body.title,
            contents: req.body.contents
        }

       // addMemo(newMemo);
         parsedMemos.push(newMemo);
         res.send("allt i godu");
       fs.writeFile(fileLocation, JSON.stringify(parsedMemos), (err) => {
            if (err) {
                throw err;
            } else {
                res.send("allt i godu");
            }
        });

    });*/
});

// ---------------------------------------------------------------------
// VIEW A MEMO
//

 // TODO!

 router.get("/api/viewMemo/:id", (req, res) => {
    
     //dbdata.getNotebyId(1, (err, data)=> {
    //    if (err){
    //        console.log(error)
    //        //res.status(500);
    //        //res.json({error: error});
    //        return
    //    }
    
    //    //res.json(data)
    //    console.log(JSON.stringify(data));    
    //})

    dbdata.getNotebyId(parseInt(req.params.id)).then((data) => {
        console.log(JSON.stringify(data.rows));  
        res.json(data.rows)
    }).catch((error) => {
        console.log(error)
         res.status(500);
         res.json({error: error});
    });
    
    
    
    
   /* fs.readFile(fileLocation, "utf8", (err, memos) => {
       let jdata = JSON.parse(memos);
      
       var filtered = _.where(jdata, {id: parseInt(req.params.id)});


       res.send(filtered);
    });*/


});


// ---------------------------------------------------------------------
// UPDATE A MEMO
// ---------------------------------------------------------------------

 // TODO!
 // You would usually use a PUT for :id but let's use a HTTP GET for simplicity's sake
router.put("/api/updateMemo", (req, res) => {

    console.log("about to update");
    dbdata.updateNote( parseInt(req.body.id), req.body.title, req.body.contents ).then((data) => {
        //console.log(JSON.stringify(data));  
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




// ---------------------------------------------------------------------
// EXPORT MODULE
// ---------------------------------------------------------------------
module.exports = router;