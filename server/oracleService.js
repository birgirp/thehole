const oracledb = require('oracledb');
const dbconfig = { user: 'noteapp', password: 'note', connectString: 'localhost:1521/xepdb1' };
oracledb.autocommit = true;




function getConnection() {
    try {
        console.log("connecting to oracle...");
        return oracledb.getConnection(dbconfig);

    } catch (err) {
        console.log("Err = " + err);
    }
}


function doRelease(connection) {
    connection.close(
      function(err) {
        if (err)
          console.error(err.message);
      });
    }



module.exports = {

    getNotebyId: function (id) {
        return new Promise((resolve, reject) => {
            let conn;
            getConnection().then((connection) => {
                conn = connection;
                return conn.execute('select * from note where id = :id ', [1]);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error)
            }).then(() => {
                doRelease(conn);
            })
        })
    },

    addNewNote: function (name, contents) {
        console.log("about to insert1");
        return new Promise((resolve, reject) => {
            console.log("about to insert2");
            let conn;
            getConnection().then((connection) => {
                conn = connection;
                console.log("about to insert3");
                return conn.execute('insert into note (note_name, content) values (:name, :contents)', [name, contents]);
            }).then((result) => {
                
                conn.commit();
                resolve(result);
            }).catch((error) => {
                console.log("error: " + error.toString() );
                reject(error.toString())
            }).then(() => {
                doRelease(conn);
            })
        })
    },
    updateNote: function (id, name, contents) {
        console.log("about to update1");
        return new Promise((resolve, reject) => {
            console.log("about to update2");
            let conn;
            getConnection().then((connection) => {
                conn = connection;
                console.log("about to update3 " + name + " " + contents);
                
                return  conn.execute('update note set note_name = :name, content = :contents where id=22', [name, contents]);
            }).then((result) => {
                console.log("about to commit");
                conn.commit();
                resolve(result);
            }).catch((error) => {
                reject(error.toString())
            }).then(() => {
                doRelease(conn);
            })
        })
    }
 


};