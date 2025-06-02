const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const {
  receivedRequests,
  getConnections,
  getFeed,
} = require("../controllers/userRouter");
const userRouter = express.Router();

userRouter.get("/requests/received", jwtAuth, receivedRequests);
userRouter.get("/connections", jwtAuth, getConnections);
userRouter.get("/feed", jwtAuth, getFeed);

module.exports = userRouter;
