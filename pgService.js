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

/*const pool = new Pool({
    user: 'golfapp',
    host: 'localhost',
    database: 'hole2',
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
    ssl: dbconfig.dbconnection.ssl
})

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
            pool.query('SELECT id, hole, par, handicap FROM holes WHERE course_id = $1 order by hole', [courseId]).then((results) => {
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

    updateTour: function (tourId, tourName, tourStatus, rounds) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE tours set tour_name = $1, tour_status = $2, rounds = $3 where id = $4', [tourName, tourStatus, rounds, tourId]).then((results) => {
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
    insertTourTeam: function (tour_id, name) {

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO tour_teams (tour_id, name) values ($1, $2) returning id', [tour_id, name]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    insertTeamMembers: function (team_id, players) {
        let data = players.map((val, index, arr) => { return [team_id, val] });
        let query = format('INSERT INTO team_members (team_id, player_id) values %L', data);
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
            pool.query('select t.id, tour_name, tour_status, rounds, count(tt.name) as teams from tours t \
            left join tour_teams tt on t.id = tt.tour_id \
            group by t.id, tour_name, tour_status, rounds ').then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTourById: function (tourId) {
        return new Promise((resolve, reject) => {


            pool.query('select tour_name, tour_status, rounds as tour_rounds, count(tt.name) as hasteams  from tours t \
            left join tour_teams tt on tt.tour_id = t.id where t.id = $1 \
            group by tour_name, tour_status, rounds', [tourId]).then((results) => {
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
            pool.query('select p.player_id , u.full_name, u.handicap  from tour_players p join users u on u.id = p.player_id where p.tour_id =$1', [tourId]).then((results) => {
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

    insertScoreCard: function (tourId, tourRound, courseId, playerId, roundDate, handicap, status) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO scorecards (tour_id, tour_round, course_id, player_id, round_date, handicap, status) values ($1, $2, $3, $4, $5, $6, $7 ) returning id', [tourId, tourRound, courseId, playerId, roundDate, handicap, status]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    updateScoreCard: function (courseId, roundDate, handicap, status, scorecardId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE scorecards set  course_id = $1,  round_date = $2, handicap = $3, status = $4 where id = $5', [courseId, roundDate, handicap, status, scorecardId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    updateScoreCardStatus: function (status, scorecardId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE scorecards set status = $1 where id = $2', [status, scorecardId]).then((results) => {
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
    updateScores: function (scores) {
        //     scores.push({scorecardId: scorecardId, holeId: holeId, score: score, points:points})
        // const dataMulti = [{id: 1, val: 123, msg: 'hello'}, {id: 2, val: 456, msg: 'world!'}];
        console.log("Updating scores...")

        q = pgp.helpers.update(scores, ['?scorecard_id', '?hole_id', 'strokes', 'points'], 'hole_scores') + ' WHERE t.scorecard_id = v.scorecard_id and v.hole_id = t.hole_id';
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
    updateHoles: function (holes) {
        //     scores.push({scorecardId: scorecardId, holeId: holeId, score: score, points:points})
        // const dataMulti = [{id: 1, val: 123, msg: 'hello'}, {id: 2, val: 456, msg: 'world!'}];
        console.log("Updating scores...")

        q = pgp.helpers.update(holes, ['?id', 'par', 'handicap'], 'holes') + ' WHERE  v.id = t.id';

        return new Promise((resolve, reject) => {
            pool.query(q).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    getScorecardScores: function (tourId, roundNum, playerId) {
        console.log([tourId])
        console.log([roundNum,])
        console.log([playerId])
        return new Promise((resolve, reject) => {
            pool.query('select *  from v_scorecards_scores where tour_id =  $1 and tour_round = $2 and player_id = $3;', [tourId, roundNum, playerId]).then((results) => {
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

    getStablefordGameScorecards: function (tourId, round) {
        return new Promise((resolve, reject) => {
            pool.query('select player_id,  points, status  from v_stablefordgame_scorecards where tour_id =  $1 and tour_round = $2;', [tourId, round]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    getTourPars: function (tourId) {
        return new Promise((resolve, reject) => {
            pool.query('select player_id, full_name, pars, birdies, eagles  from v_countpars where tour_id =  $1;', [tourId]).then((results) => {
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

    getEclecticTrend: function (tourId, playerId) {
        return new Promise((resolve, reject) => {
            console.log("tourId " + tourId)
            console.log("playerId " + playerId)
            pool.query('select full_name, tour_round, score from v_eclectic_trend_per_round where tour_id = $1 and  player_id = $2 ', [tourId, playerId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getEclecticBars: function (tourId) {
        return new Promise((resolve, reject) => {
            //  console.log("tourId " + tourId)
            pool.query('select full_name, tour_round, score from v_eclectic_trend_per_round where tour_id = $1 order by tour_round, full_name', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getPlayerScorecard: function (tourId, round, playerId) {

        return new Promise((resolve, reject) => {

            pool.query('select *  from v_scorecards_round where tour_id =  $1 and tour_round = $2 and player_id = $3;', [tourId, round, playerId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getTourTeams: function (tourId) {

        return new Promise((resolve, reject) => {

            pool.query('select * from team_members tm join tour_teams tt on tt.id = tm.team_id \
            where tt.tour_id = $1 order by team_id' , [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getTourTeamNames: function (tourId) {

        return new Promise((resolve, reject) => {

            pool.query('select tt.id, tt.name , count(tg.id) as games \
            from tour_teams tt \
            left join team_games  tg on tg.tour_id = tt.tour_id \
            where tt.tour_id = $1 \
            group by tt.id, tt.name \
            order by tt.id' , [tourId]).then((results) => {


                resolve(results);

            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    getTeamGames: function (tourId) {

        return new Promise((resolve, reject) => {

            pool.query('select tg.id, tour_id, round,game_type_id, \
            status, points_a, points_b,description, gt.name as game_name, gt.min_players \
            from team_games tg  \
            join game_types gt on gt.id = tg.game_type_id\
            where tg.tour_id = $1 order by round asc;' , [tourId]).then((results) => {

                resolve(results);

            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getRoundScorecards: function (tourId, round) {

        return new Promise((resolve, reject) => {
            pool.query('select *  from v_scorecards_round where tour_id =  $1 and tour_round = $2;', [tourId, round]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },


    getTourRankSum: function (tourId) {
        // console.log("fetchingf  " + tourId + "  " + round)
        return new Promise((resolve, reject) => {
            pool.query('select player_id, sum(rank) from v_tour_round_rank where tour_id =$1 group by player_id;', [tourId]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getGameTypes: function () {
        console.log("fetching game types  ")
        return new Promise((resolve, reject) => {
            pool.query('SELECT id, min_players, name FROM game_types;').then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertTeamGame: function (tour_id, round, game, description) {
        let status = 'New'
        let points = 0

        console.log("insert game...")
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO team_games( \
                tour_id, round, game_type_id, status, points_a, points_b,description) \
                VALUES ($1, $2, $3, $4, $5, $5, $6) returning id; ', [tour_id, round, game, status, 0, description]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    getTeamMembers: function (tour_id) {
        console.log("fetching game types  ")
        return new Promise((resolve, reject) => {
            pool.query('SELECT *  FROM v_team_members where tour_id = $1;', [tour_id]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },
    insertMatchplayPairs: function (pairs) {
        // pairs = [[gameId, pA, pB,results, pointsA, pointsA, ],.., [3, 18, 3, 1] ]
        console.log("inserting MatchplayPairs...")
        let query = format('INSERT INTO match_play_pairs (game_id, player_a, player_b, results, points_a, points_b) values %L', pairs);
        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    insertTwosomeGame: function (pairs) {
        // pairs = [[gameId, pA[], pB[],results, pointsA, pointsA, ],.., [3, 18, 3, 1] ]
        console.log("inserting Twosome pairs...")
        console.log(JSON.stringify(pairs))
        let query = format('INSERT INTO twosome_pairs (game_id, player_a1, player_a2, player_b1, player_b2, results, points_a, points_b) values %L', pairs);
        return new Promise((resolve, reject) => {
            pool.query(query).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getMatchplayPairs: function (game_id) {
        console.log("fetching matchplay pairs  ")
        return new Promise((resolve, reject) => {
            pool.query('select mpp.game_id, mpp.player_a,  mpp.player_b, \
       mpp.results, mpp.points_a, mpp.points_b, tg.description \
       from match_play_pairs mpp \
       join team_games tg on tg.id = mpp.game_id \
       where game_id = $1;', [game_id]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    getTwosomePairs: function (game_id) {
        console.log("fetching matchplay pairs  ")
        return new Promise((resolve, reject) => {
            pool.query('select mpp.game_id, mpp.player_a1, mpp.player_a2, \
                mpp.player_b1, mpp.player_b2,\
       mpp.results, mpp.points_a, mpp.points_b, tg.description \
       from twosome_pairs mpp \
       join team_games tg on tg.id = mpp.game_id \
       where game_id = $1;', [game_id]).then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

    deleteMatchplay: function (gameId) {
        return new Promise((resolve, reject) => {


            pool.query('delete from match_play_pairs where game_id = $1', [gameId]).then((results) => {
                resolve(results)
            }).catch(error => {
                console.log("db error")
                reject(error)
            })
        })
    },

    deleteTwosome: function (gameId) {
        return new Promise((resolve, reject) => {


            pool.query('delete from twosome_pairs where game_id = $1', [gameId]).then((results) => {
                resolve(results)
            }).catch(error => {
                console.log("db error")
                reject(error)
            })
        })
    },

    deleteTeamGame: function(gameId){
        return new Promise((resolve,reject) =>{
            pool.query('DELETE from team_games where id = $1',[gameId])
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                console.log("db error")
                reject(error)
            })
        })
    },

    updateTeamGame: function (gameId, sumA, sumB, description, status) {
        return new Promise((resolve, reject) => {
            console.log(status)
            console.log(gameId)
            pool.query('UPDATE team_games SET points_a=$2, points_b=$3, description=$4, status=$5	WHERE id = $1;', [gameId, sumA, sumB, description, status])
            .then((results) => {
                resolve(results);
            }).catch((error) => {
                console.log("db error...")
                reject(error)
            })
        })
    },

}

