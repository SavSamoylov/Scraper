const path = require('path')
const xps = require("./xps.js")
const mongoose = require('mongoose')

mongoose.Promise = Promise;



const app = xps.app();

xps.go(app,
  {
    staticView: "public", // Also takes an array of strings for multiple view folders.
    viewEngine: "express-handlebars",
    bodyParse: ["json", "raw", "urlencoded", "text"], // TRUE or [ARRAY]
    httpLogger: "morgan",
    port: 3000, // Either an INT or STRING
  }
)


// Database
// -----------------------------------------------------------------------------

mongoose.connect("mongodb://localhost:27017/scraper");
var db = mongoose.connection;
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// -----------------------------------------------------------------------------

// Home
let home = require(path.join(__dirname, "routes/home.js"))
app.use("/", home)

// Scrape
let scrape = require(path.join(__dirname, "routes/scrape.js"))
app.use("/scrape", scrape)
