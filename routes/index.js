const express = require("express");
const router = express.Router();
const auth = require("./auth");
const request = require("./request");
const user = require("./user");
const jwtAuth = require("../middleware/jwtAuth");
const checkRole = require("../middleware/checkRole");
const ROLES = require("../config/constant");
const userRouter = require("./userRouter");
const profileRouter = require("./profile");

router.use("/auth", auth);
router.use("/request", request);
router.use("/profile", profileRouter);
router.use("/", userRouter);
router.use("/user", jwtAuth, user);

module.exports = router;
