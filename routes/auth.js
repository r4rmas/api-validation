const router = require("express").Router();
const User = require("../models/User");

//VALIDATION
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  //LETS VALIDATE
  const validation = schema.validate(req.body);
  res.send(validation);
  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // try {
  //   await user.save();
  //   res.status(201).send();
  // } catch (error) {
  //   res.status(500).send();
  // }
});

module.exports = router;
