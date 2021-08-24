const express = require('express');

const router = express.Router();



//@Route  GET api/profile
//@DESC   test route
//@access public
router.get('/', (req, res)=>{
    res.send("profile Router")
})



module.exports = router