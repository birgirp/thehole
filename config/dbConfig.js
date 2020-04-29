// load enviromental variables
//let env = process.env.environment;
//let user = process.env.user;

//let env = 'home'
let env = 'production'
//let env = 'production'

// functions that load dbs

function useHerokuDb() {
  return {
    dbType: 'pgHeroku',
    dbconnection: {
      host: 'ec2-23-23-195-205.compute-1.amazonaws.com',
      database: 'd9nps47np7nuj2',
      user: 'wdjicccgirusxg',
      port: 5432,
      password:
        '80f4480939e4da993143ffb126e48a15a5555f40fb595a4e5ae4c9941e727908',
      ssl: true,
    },
  }
}

function useWorkDb() {
  return {
    dbType: 'pg',
    dbconnection: {
      host: 'localhost',
      database: 'thehole5',
      user: 'golfapp',
      port: 5432,
      password: 'golf',
      ssl: false,
    },
  }
}

function useHomeDb() {
  return {
    dbType: 'pg',
    dbconnection: {
      host: 'localhost',
      database: 'postgres',
      user: 'thehole',
      port: 5432,
      password: 'beta3',
      ssl: false,
    },
  }
}

function elephantDb() {
  return {
    dbType: 'pg',
    dbconnection: {
      host: 'manny.db.elephantsql.com',
      database: 'izkucyvk',
      user: 'izkucyvk',
      port: 5432,
      password: 'OkAmyW_WPPwU3__uperrNBtwedc0mr7s',
      ssl: true,
      max: 2,
    },
  }
}

function notValid() {
  console.log('not a valid environment!')
}

// check for environment, export module
if (env === 'production') {
  module.exports = useHerokuDb()
} else if (env === 'work') {
  module.exports = useWorkDb()
} else if (env === 'home') {
  module.exports = useHomeDb()
} else if (env === 'elephant') {
  module.exports = elephantDb()
} else {
  module.exports.useDb = notValid
}

/*


module.exports = {
    "dbType": "pg",
        "dbconnection": {
            "host": "localhost",
            "database": "thehole5",
            "user": "golfapp",
            "port": 5432,
            "password": "golf",
            "ssl": false

    }
};


let environment = 'work'

module.exports = function () {
    switch (environment) {
        case 'heroku':
            return {
                "dbType": "pgHeroku",
                "dbconnection": {
                    "host": "ec2-23-23-195-205.compute-1.amazonaws.com",
                    "database": "d9nps47np7nuj2",
                    "user": "wdjicccgirusxg",
                    "port": 5432,
                    "password": "80f4480939e4da993143ffb126e48a15a5555f40fb595a4e5ae4c9941e727908",
                    "ssl": true
                }
            }
        case 'work':
            return {
                "dbType": "pg",
                "dbconnection": {
                    "host": "localhost",
                    "database": "thehole5",
                    "user": "golfapp",
                    "port": 5432,
                    "password": "golf",
                    "ssl": false
                }
            }
        case 'home':
            return {
                "dbType": "pg",
                "dbconnection": {
                    "host": "localhost",
                    "database": "postgres",
                    "user": "thehole",
                    "port": 5432,
                    "password": "beta3",
                    "ssl": false
                }
            }
    }
}

*/
