const oracledb = require('oracledb');
const dbConfig = require('./config/dbConfig');

oracledb.autocommit = true;


function initializeDB() {
   
    return oracledb.createPool(dbConfig.connection).then((res) => {
        console.log("DB pool created:", res.poolAlias);
        return getConnectionPromise();
    }).then((conn) => {
        console.log("DB connection established");
        doRelease(conn);
        return Promise.resolve("OK");
    }).catch(err => {
        console.error("Error initializing DB", err);
        return Promise.reject(err);
    });
}

function closePool() {
    return oracledb.getPool(dbConfig.connection.poolAlias).close();
}

function getConnectionPromise() {
    return oracledb.getPool(dbConfig.connection.poolAlias).getConnection();
}




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
    initializeDB: initializeDB,
    closePool: closePool,

    getUserbyEmail: function (email, passw) {
        return new Promise((resolve, reject) => {
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
               // console.log(email + "  " + passw);
                return conn.execute('select name from users where email = :email and password = :passw ', [email, passw]);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error)
            }).then(() => {
                doRelease(conn);
            })
        })
    },

    getAllUsers: function () {
        return new Promise((resolve, reject) => {
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                return conn.execute('select name, email, handicap from users');
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error)
            }).then(() => {
                doRelease(conn);
            })
        })
    },



    //  OLD export
//---------------------------------------------------------------------------------------



    getNotebyId: function (id) {
        return new Promise((resolve, reject) => {
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                return conn.execute('select id, name, content from note where id = :id ', [id]);
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error)
            }).then(() => {
                doRelease(conn);
            })
        })
    },
    getAllNotes: function () {
        return new Promise((resolve, reject) => {
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                return conn.execute('select id, name, content from note');
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
            getConnectionPromise().then((connection) => {
                conn = connection;
                console.log("about to insert3");
                return conn.execute('insert into note (name, content) values (:name, :contents)', [name, contents]);
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
       
        return new Promise((resolve, reject) => {
         
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                    
                return  conn.execute('update note set name = :name, content = :contents where id=:id', [name, contents, id]);
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
    },
    deleteNotes: function (ids) {
        return new Promise((resolve, reject) => {

            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                console.log("deleting from db...") 
                return conn.executeMany('delete from note where id = :1', ids);
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