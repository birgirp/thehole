const Pool = require('pg').Pool



const pool = new Pool({
    user: 'golfapp',
    host: 'localhost',
    database: 'golfdb',
    password: 'golf',
    port: 5432,
})

/*
    const getAllNotes = (request, response) => {
        const { email, password } = request.body
        console.log("in pgservice...");
        console.log(email, password)
        pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [email, password],  (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }

     getUserbyEmail: function (email, passw)  {
        console.log("in pgservice...");
        console.log(JSON.stringify(request.body))
        const { email, password } = request.body
        console.log(email, password)
        pool.query('select * FROM users WHERE email = $1 and password = $2', [email, password],  (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
*/
module.exports = {

    getUserbyEmail: function (e_mail, passw) {
        return new Promise((resolve, reject) => {

            pool.query('SELECT id, full_name, email, handicap, is_admin FROM users where "email" = $1 and "password" = $2', [e_mail, passw]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getAllUsers: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT id, full_name, email, handicap, is_admin FROM users').then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    }
}

//-------------------------------------------

/*
      const getUserById = (request, response) => {
        const id = parseInt(request.params.id)

        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json(results.rows)
        })
      }
      module.exports = {
        getUserbyEmail,
        getUserById ,
        getAllNotes
      }

/*
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
                return conn.execute('select id, name, email, handicap, isadmin from users where email = :email and password = :passw ', [email, passw]);
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

    getHandicap: function (userid) {
        return new Promise((resolve, reject) => {
            let conn;
            getConnectionPromise().then((connection) => {
                conn = connection;
                return conn.execute('select handicap from users where id = :id', [userid]);
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

*/