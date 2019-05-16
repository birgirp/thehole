// External imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Pool = require('pg').Pool;


var session = require("express-session");
//const FileStore = require("session-file-store")(session)
var passport = require("passport");

var PostgreSqlStore = require('connect-pg-simple')(session);
const dbconfig = require('./config/dbConfig');

const pool = new Pool({
    user: dbconfig.dbconnection.user,
    host: dbconfig.dbconnection.host,
    database: dbconfig.dbconnection.database,
    password: dbconfig.dbconnection.password,
    port: dbconfig.dbconnection.port,
    ssl:  dbconfig.dbconnection.ssl
})


// Internal imports
const routes = require("./routes/routes");
const users = require("./routes/users");


// Start express
const app = express();

// Use default environment port. If none exists, use port 5000
const port = process.env.PORT || 5000;

// Use json for all communication
app.use(bodyParser.json());


// Handle sessions
app.use(session({


  store : new PostgreSqlStore({

    pool: pool
  }),

    secret:'secret',
    saveUninitialized: true,
    resave: true,
    maxAge: 24 * 60 * 60 * 1000
}));
// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Use our defined routes
app.use("/", routes);
app.use("/users", users);

// Serve static assets and point to index.html file
app.use("/", express.static(path.join(__dirname, "/client/build/")));




// Validator
/*app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.lenght){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value: value
            
        }
    }
}));*/

//app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/client/build/index.html")));
app.get('*', (req, res) => res.sendFile(path.join(__dirname + "/client/build/index.html")));

// Start server!
app.listen(port, () => {

    console.log("Listening on port: " + port);
});

