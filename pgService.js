const Pool = require('pg').Pool;
const format = require('pg-format');
const dbconfig = require('./config/dbConfig');
const pgp = require('pg-promise')({
    capSQL: true // if you want all generated SQL capitalized
 });


/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});*/

const pool = new Pool({
    user: 'golfapp',
    host: 'localhost',
    database: 'hole2',
    password: 'golf',
    port: 5432,
})

/*const pool = new Pool({
    user: dbconfig.dbconnection.user,
    host: dbconfig.dbconnection.host,
    database: dbconfig.dbconnection.database,
    password: dbconfig.dbconnection.password,
    port: dbconfig.dbconnection.port,
    ssl: true
})*/

module.exports = {

    getUserbyEmail: function (e_mail, passw) {

        return new Promise((resolve, reject) => {
                console.log(e_mail)
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

    insertScoreCard: function (tourId,tourRound, courseId, playerId, roundDate , handicap, status ) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO scorecards (tour_id, tour_round, course_id, player_id, round_date, handicap, status) values ($1, $2, $3, $4, $5, $6, $7 ) returning id', [tourId,tourRound, courseId, playerId, roundDate , handicap, status]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    
    updateScoreCard: function (courseId,  roundDate , handicap, status, scorecardId ) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE scorecards set  course_id = $1,  round_date = $2, handicap = $3, status = $4 where id = $5', [ courseId,  roundDate , handicap, status, scorecardId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

        
    updateScoreCardStatus: function ( status, scorecardId ) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE scorecards set status = $1 where id = $2', [ status, scorecardId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    insertScores: function (scores) {
        //holes = [[3, 1, 5, 7],.., [3, 18, 3, 1] ]
        console.log("inserting scores...")
        let query = format('INSERT INTO hole_scores (hole_id, strokes, points, scorecard_id) values %L', scores);
        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })

    },
    updateScores: function (scores ) {
        //     scores.push({scorecardId: scorecardId, holeId: holeId, score: score, points:points})
        // const dataMulti = [{id: 1, val: 123, msg: 'hello'}, {id: 2, val: 456, msg: 'world!'}];
        console.log("Updating scores...")

      q=  pgp.helpers.update(scores, ['?scorecard_id', '?hole_id', 'strokes', 'points'], 'hole_scores') + ' WHERE t.scorecard_id = v.scorecard_id and v.hole_id = t.hole_id';
//=> UPDATE "my-table" AS t SET "val"=v."val","msg"=v."msg" FROM (VALUES(1,123,'hello'),(2,456,'world!'))
//   AS v("id","val","msg") WHERE v.id = t.id

      //  let query = format('UPDATE hole_scores set ', scores);
        return new Promise((resolve, reject) => {
            pool.query(q).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })

    },

    getScorecardScores: function (tourId, roundNum,playerId) {
        return new Promise((resolve, reject) => {
            pool.query('select *  from v_scorecards_scores where tour_id =  $1 and tour_round = $2 and player_id = $3;', [tourId, roundNum,playerId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getTourScorecards: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select player_id, tour_round, strokes, points  from v_scorecards_sum where tour_id =  $1;', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTourEclectic: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select player_id, full_name, hole, eclectic  from v_eclectic where tour_id =  $1 order by full_name, hole;', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getRoundScorecards: function(tourId, round){
        console.log("fetchingf  " + tourId + "  " + round)
            return new Promise((resolve, reject) => {
                pool.query('select *  from v_scorecards_round where tour_id =  $1 and tour_round = $2;', [tourId, round]).then((results) => {
                    resolve(results);
                }).catch((error) => {
                    console.log("db error...")
                    reject(error)
                })
            })
    },
}

