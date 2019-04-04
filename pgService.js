const Pool = require('pg').Pool;
const Client = require('pg').Client;
const format = require('pg-format');
const dbconfig = require('./config/dbConfig');


/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});*/

/*const pool = new Pool({
    user: 'golfapp',
    host: 'localhost',
    database: 'hole',
    password: 'golf',
    port: 5432,
})
*/
const pool = new Pool({
    user: dbconfig.dbconnection.user,
    host: dbconfig.dbconnection.host,
    database: dbconfig.dbconnection.database,
    password: dbconfig.dbconnection.password,
    port: dbconfig.dbconnection.port,
    ssl: true
})

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
    getUserById: function (userId) {

        return new Promise((resolve, reject) => {
            pool.query('SELECT id, full_name, email, handicap, is_admin FROM users where id = $1', [userId]).then((results) => {
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
    },

    insertUser: function (username, email, hcp, isadmin, passw) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO users(full_name, email, handicap, is_admin, password) values ($1, $2, $3, $4, $5) returning id', [username, email, hcp, isadmin, passw]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    editUser: function (username, email, hcp, isadmin, passw, userId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE users SET full_name=$1,  email=$2, handicap=$3,is_admin=$4, password=$5 WHERE id=$6', [username, email, hcp, isadmin, passw, userId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    deleteUser: function (userId) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM users where id = $1', [userId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })

    },
    getAllCourses: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT id, course_name, tee, country FROM courses').then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getHoles: function (courseId) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT id, hole, par, handicap FROM holes WHERE course_id = $1', [courseId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertCourse: function (courseName, tee, country) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO courses (course_name, tee, country) values ($1, $2, $3 ) returning id', [courseName, tee, country]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })

    },

    insertHoles: function (holes) {
        //holes = [[3, 1, 5, 7],.., [3, 18, 3, 1] ]
        let query = format('INSERT INTO holes (course_id, hole, par, handicap) values %L', holes);
        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })

    },

    insertTour: function (tourName, tourStatus, rounds) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO tours (tour_name, tour_status, rounds) values ($1, $2, $3 ) returning id', [tourName, tourStatus, rounds]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertTourRound: function (tourId) {
        // insert into tour_rounds (tour_id, round_number) values(5,(select max(round_number)+1 from tour_rounds where tour_id = 5) );
        return new Promise((resolve, reject) => {
            pool.query('insert into tour_rounds (tour_id, round_number) values($1,(select max(round_number)+1 from tour_rounds where tour_id = $1) )', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertTourPlayers: function (tour_id, players) {
        let data = players.map((val, index, arr) => { return [tour_id, val] });
        let query = format('INSERT INTO tour_players (tour_id, player_id) values %L', data);
        console.log(JSON.stringify(data))

        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertTourCourses: function (tour_id, courses) {
        let data = courses.map((val, index, arr) => { return [tour_id, val] });
        let query = format('INSERT INTO tour_courses (tour_id, course_id) values %L', data);
        console.log(JSON.stringify(data))
        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getAllTours: function () {
        return new Promise((resolve, reject) => {
            pool.query('select id, tour_name, tour_status, rounds as tour_rounds from tours ').then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTourById: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select tour_name, tour_status, rounds as tour_rounds from tours where id = $1', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getPlayerTours: function (playerId) {
        return new Promise((resolve, reject) => {
            pool.query('select t.id, t.tour_name, t.tour_status from tours t  join tour_players p on t.id = p.tour_id where p.player_id = $1', [playerId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTourPlayers: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select p.player_id , u.full_name  from tour_players p join users u on u.id = p.player_id where p.tour_id =$1', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTourCourses: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select t.course_id , c.course_name, c.tee  from tour_courses t join courses c on c.id = t.course_id where t.tour_id =$1', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

}

