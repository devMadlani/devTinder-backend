const express = require("express");
const profileRouter = express.Router();
const { getUser, updateUser } = require("../controllers/profile");
const jwtAuth = require("../middleware/jwtAuth");

profileRouter.get("/view", jwtAuth, getUser);
profileRouter.patch("/edit", jwtAuth, updateUser);

module.exports = profileRouter;
