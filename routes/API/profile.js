const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const Profile = require("../../models/profile");
const User = require("../../models/user");
//@Route  GET api/profile/me
//@DESC   get current user profile
//@access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//@Route  POST api/profile/
//@DESC   create or update user profile
//@access private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //get profile fields
    const profileFields = {};
    profileFields.user = req.user.id;
    //   if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills
        .split(",")
        .map((skill) => skill.trim());
    }

    //social links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    // if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//@Route  GET api/profile/
//@DESC   Get all profile
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@Route  GET api/profile/:profileID
//@DESC   Get spesific profile
//@access Public
router.get("/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
      const profile = await Profile.findOne({user : userID }).populate("user", ["name", "avatar"]);
      if(!profile) return res.status(400).json({msg: ' No user profile'})
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if(err.kind === 'objectId'){
        return res.status(400).json({msg: ' Profile not found'})
      }
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
