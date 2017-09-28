const express = require('express')
const mongoose = require('mongoose')
// Requiring our Note and Article models
var Note = require("../models/notes.js");
var Article = require("../models/articles.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


let router = express.Router()


// User REGISTER GET Routes
router.get('/', (req, res)=>{

  request("https://techcrunch.com/", function(error, response, html) {

    var $ = cheerio.load(html);

    $(".block-content").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children('.post-title').text();
      result.link = $(this).children('.post-title').children("a").attr("href");
      result.summary = $(this).children('.excerpt').text();
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      // var entry = new Article(result);

      // Now, save that entry to the db
      // entry.save(function(err, doc) {
      //   // Log any errors
      //   if (err) {
      //     console.log(err);
      //   }
      //   // Or log the doc
      //   else {
      //     console.log(doc);
      //   }
      // });

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});




module.exports = router;
