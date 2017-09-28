const express = require('express')


let router = express.Router()


// User REGISTER GET Routes
router.get('/', (req, res)=>{
  res.render('index');
})


module.exports = router;
