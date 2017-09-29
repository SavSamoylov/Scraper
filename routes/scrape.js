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


// SCRAPE Routes
router.get('/', (req, res)=>{


  getScrape((data)=>{
    res.json(data)
  })


});


module.exports = router;

// Helper Functions
// =============================================================
function getScrape(cb){

  request("https://techcrunch.com/", function(error, response, html) {

    let resultArr = [];

    const $ = cheerio.load(html);

    $(".block-content").each(function(i, element) {

      let result = {};

      result.title = $(this).children('.post-title').text();
      result.link = $(this).children('.post-title').children("a").attr("href");
      result.summary = $(this).children('.excerpt').text();

      if(result.title || result.link || result.summary){
        resultArr.push(result);
      }

    });

    cb(resultArr)
    
  });

}
