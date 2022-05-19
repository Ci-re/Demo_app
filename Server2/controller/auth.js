require("dotenv").config();
const User = require("../model/User");
// const requireSignin = jwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// });

const signup = async (req, res) => {
  console.log("Sign up hit");
  const { name, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    console.log("email exists");
    return res.json({
      error: `A user with this email ${email} already exists`,
    });
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  user.password = undefined;
  res.json({ user, token });
};

// Signin controller
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "Sorry, We can't find any user with that email" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.json({ error: "Please provide a valid password" });
  }

  const token = user.createJWT();
  (user.password = undefined), res.json({ token, user });
};

const uploadImage = async (req, res) => {
  console.log(req.user._id);
  //console.log("upload image > user_id", req.user._id);
};
module.exports = {
  signup,
  signin,
  uploadImage,
};
