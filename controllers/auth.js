const User = require("../Models/User");
const generateToken = require("../utils/tokenGeneration");
const { validateSignUpData } = require("../utils/validatoin");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const validate = await user.isValidatePass(password);

    if (!validate) {
      return res.status(400).send({ message: "Invalid Credential" });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .cookie("token", token, {
        htttpOnly: true,
        sameStie: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "login successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  validateSignUpData(req);
  const { firstName, lastName, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(500).json({ message: "email is already exists" });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedData = await user.save();
    const token = generateToken(savedData._id);
    const { password, ...others } = savedData._doc;
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "register successfully",
        data: others,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  const token = req.cookies.token; // Check if the token exists in the cookies

  if (!token) {
    // If no token is found, return a message
    return res.status(400).json({ message: "User already logged out" });
  }
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ messge: "Logout Successfully" });
};

module.exports = { login, signup, logout };
