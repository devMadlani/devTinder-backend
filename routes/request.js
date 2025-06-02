const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const { sendRequest, reviewRequest } = require("../controllers/request");
const router = express.Router();

router.post("/send/:status/:toUserId", jwtAuth, sendRequest);

router.post("/review/:status/:requestId", jwtAuth, reviewRequest);

module.exports = router;
