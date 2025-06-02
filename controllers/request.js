const ConnectionRequest = require("../Models/ConnectionRequest");
const User = require("../Models/User");
const { isValidObjectId } = require("mongoose");
const sendRequest = async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;
  try {
    if (!isValidObjectId(toUserId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status is not valid" });
    }
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fromUserId.equals(toUserId)) {
      return res
        .status(400)
        .json({ message: "Request can't sent to yourself" });
    }
    const existingConnectionReqest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnectionReqest) {
      return res
        .status(401)
        .json({ message: "Connection request is already sent" });
    }

    const connectionRequest = await ConnectionRequest.create({
      fromUserId,
      toUserId,
      status,
    });
    res.status(201).json({
      message: `${req.user.name} is ${status} ${
        status === "interested" ? "in " : ""
      }${toUser.name}`,
      connectionRequest,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const reviewRequest = async (req, res) => {
  try {
    const logInUser = req.user;
    const { status, requestId } = req.params;

    if (!isValidObjectId(requestId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status is not valid" });
    }
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: logInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "connection request is not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.status(201).json({ message: "connection request is " + status, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendRequest, reviewRequest };
