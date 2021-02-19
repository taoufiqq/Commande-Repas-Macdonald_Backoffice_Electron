const express = require('express')
let Admin = require('../models/admin.model');
const router = express.Router();


// add category

router.route("/add").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const adminPush = new Admin({
      username,
      password
    });
   adminPush
      .save()
      .then(() => res.json("Admin successfully added"))
      .catch((err) => res.status(400).json("Error :" + err));
  });
  
  module.exports = router;