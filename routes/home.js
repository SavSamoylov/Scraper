const express = require('express')


let router = express.Router()


// User REGISTER GET Routes
router.get('/', (req, res)=>{
  res.render('index');
})


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
