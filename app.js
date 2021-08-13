require("dotenv").config();
require("./config/database").connect();

// package imports
const express = require("express");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// importing user context
const User = require("./model/user");

const app = express();

app.use(express.json());

// Register
app.post("/register", async (req, res) => {
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;

      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required\n email,password,first_name,last_name");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).json({"error":"User Already Exist. Please Login"});
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database using User schema in user.js
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create JWT token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(401).json({"error":err});
    }
    // Our register logic ends here
  });
  
    
// Login
app.post("/login", (req, res) => {
    // our login logic goes here
    console.log("Login hit!");
});
module.exports = app;

