const path = require('path')
const xps = require("./xps.js")



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


// Routes
// -----------------------------------------------------------------------------
