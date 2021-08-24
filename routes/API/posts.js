const express = require('express');


const router = express.Router();



//@Route  GET api/post
//@DESC   test route
//@access public
router.get('/', (req, res)=>{
    res.send("post Router")
})


module.exports = router