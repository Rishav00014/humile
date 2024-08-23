const express = require("express");
const router = express.Router();

const MessageController = require("./message.controller");

var checkAccessWithSecretKey = require("../../checkAccess");

router.use(checkAccessWithSecretKey());

//get message list
router.get("/", MessageController.index);

//create message
router.post("/", MessageController.store);

//update message
router.patch("/:messageId", MessageController.update);

// //delete message
router.delete("/:messageId", MessageController.destroy);

module.exports = router;
