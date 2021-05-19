const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validating data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hashing password and saving user
  await bcrypt.hash(req.body.password, 10, async (error, hash) => {
    if (!error) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      try {
        await user.save();
        res.status(201).send();
      } catch (error) {
        res.status(500).send();
      }
    }
  });
});

router.post("/login", async (req, res) => {
  //validating data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  //cheking if password is correct
  const validPass = await bcrypt.compare(
    req.body.password,
    user.password,
    (error, result) => {
      if (error) return res.status(400).send("An error has occurred");
      if (result == false)
        return res.status(400).send("Email or password is wrong");
      //login
      return res.status(200).send("Logged in");
    }
  );
});

module.exports = router;
