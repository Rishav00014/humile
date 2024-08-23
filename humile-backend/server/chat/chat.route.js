const express = require("express");
const router = express.Router();
const ChatController = require("./chat.controller");

const multer = require("multer");
const storage = require("../../util/multer");
const upload = multer({
  storage,
});

var checkAccessWithSecretKey = require("../../checkAccess");

router.use(checkAccessWithSecretKey());

router.get("/", ChatController.index);

router.get("/oldchat", ChatController.oldChat);

router.post("/", upload.single("image"), ChatController.createChat);

module.exports = router;
