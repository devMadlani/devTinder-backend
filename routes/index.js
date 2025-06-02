const express = require("express");
const router = express.Router();
const auth = require("./auth");
const request = require("./request");
const jwtAuth = require("../middleware/jwtAuth");
const userRouter = require("./userRouter");
const profileRouter = require("./profile");

router.use("/auth", auth);
router.use("/request", request);
router.use("/profile", profileRouter);
router.use("/", userRouter);

module.exports = router;
