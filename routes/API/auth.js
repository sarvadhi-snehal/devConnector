const express = require('express');
const auth = require('../../middleware/auth')
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config = require("config");


//@Route  GET api/auth
//@DESC   test route
//@access public
router.get('/',auth, async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
    
})



//@Route  POST api/auth
//@DESC   Authenticate user and get token
//@access public
router.post(
    "/",
    [
   
      check("email", "Enter valid email").isEmail(),
      check("password", "Password is require").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {  email, password } = req.body;
      try {
        //if user exists
  
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Cradentials" }] });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res
                .status(400)
                .json ({errors : [{msg: 'Invalid Credentials'}]})
        }
    
        
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      //   res.status(200).send("user rgistered");
        // return json web token
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  );


module.exports = router