const router = require("express").Router();
const User = require("../models/User");
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
  const user = await User.findById(req.user);
  //ya que el jwt lo unico que tiene es el _id no es necesario
  //especificarlo (el iat es default)
  res.status(200).send(user);
});

module.exports = router;
