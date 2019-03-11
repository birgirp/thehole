// External imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Internal imports
const routes = require("./routes/routes");
const users = require("./routes/users");
const dbservice = require("./oracleService");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var expressValidator = require("express-validator");


//console.log(" dbConf: ", dbservice)
dbservice.initializeDB()


// Start express
const app = express();

// Use default environment port. If none exists, use port 5000
const port = process.env.PORT || 5000;

// Use json for all communication
app.use(bodyParser.json());

// Use our defined routes
app.use("/", routes);
app.use("/users", users);

// Serve static assets and point to index.html file
app.use("/", express.static(path.join(__dirname, "/../client/build/")));

// Handle sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
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
}));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/../client/build/index.html")));

// Start server!
app.listen(port, () => {
  /*  process.on('SIGINT', () => {
        console.log("Got SIGINT. Closing...");
        dbservice.closePool();
    });

    process.on('SIGTERM', () => {
        console.log("Got SIGTERM. Closing...");
        dbservice.closePool();
    });*/
    console.log("Listening on port: " + port);
});

