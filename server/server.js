// External imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// Internal imports
const routes = require("./routes");

// Start express
const app = express(); 

// Use default environment port. If none exists, use port 5000
const port = process.env.PORT || 5000;

 // Use json for all communication
app.use(bodyParser.json());
 
// Use our defined routes
app.use("/", routes);

// Serve static assets and point to index.html file
app.use("/", express.static(path.join(__dirname, "/../client/build/")));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/../client/build/index.html")));

 // Start server!
app.listen(port, () => {
    console.log("Listening on port: " + port);
});