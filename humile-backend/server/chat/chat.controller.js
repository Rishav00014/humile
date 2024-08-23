const Chat = require("./chat.model");
const User = require("../user/user.model");
const Host = require("../host/host.model");
const Message = require("../message/message.model");
const arraySort = require("array-sort");

const { deleteFile } = require("../../util/deleteFile");

const dayjs = require("dayjs");

const shuffleArray = require("../../util/shuffle");

const { baseURL } = require("../../config");

//hii,hello
const chatList1 = ["hii", "hlw", "heyy", "hey", "hello", "hi"];

//greetings
const chatList2 = ["good morning", "good night", "good noon", "good evening", "sweet dreams", "take care", "bye", "good afternoon"];

//random
const chatList3 = ["okay", "say else", "hmm", "yaa", "yeah!!", "😍😍🥰", "😛🤩😎", "😘😗😉", "😊", "what is your dream ?"];

const imageSynonyms = ["image", "pic", "photo", "img", "picture", "photography", "portrait", "sketch", "profile", "dp"];

exports.createChat = async (req, res) => {
  try {
    if (req.body.userId && req.body.hostId && req.body.message) {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(200).json({ status: false, message: "User does not Exist !!" });
      }

      const host = await Host.findById(req.body.hostId);
      if (!host) {
        return res.status(200).json({ status: false, message: "Host does not Exist !!" });
      }

      // const chat__ = await Chat.find();

      // await chat__.map(async (d) => {
      //   await d.deleteOne()
      // });

      // return res.send(chat__);

      const chat = await Chat.create({
        user: req.body.userId,
        host: req.body.hostId,
        message: req.file ? "📸 Image" : req.body.message,
        image: req.file ? baseURL + req.file.path : null,
        isSchedule: false,
        date: new Date().toLocaleString(),
        senderType: "user",
      });

      let msg,
        image = null;

      if (imageSynonyms.some((v) => req.body.message.toLowerCase().includes(v))) {
        image = null;
        msg = "📸 Image";
      } else if (chatList1.some((v) => req.body.message.toLowerCase().includes(v))) {
        shuffleArray(chatList1);
        msg = chatList1[0];
      } else if (chatList2.some((v) => req.body.message.toLowerCase().includes(v))) {
        shuffleArray(chatList2);
        msg = chatList2[0];
      } else if (chatList3.some((v) => req.body.message.toLowerCase().includes(v))) {
        shuffleArray(chatList3);
        msg = chatList3[0];
      } else {
        const messages = await Message.findOne({
          question: { $regex: req.body.message, $options: "i" },
        });

        if (messages) {
          messages.answer.reverse();
          shuffleArray(messages.answer);
          msg = messages.answer[0];
        } else {
          shuffleArray(chatList3);
          chatList3.reverse();
          msg = chatList3[0];
        }
      }

      const chat_ = await Chat.create({
        user: req.body.userId,
        host: req.body.hostId,
        message: msg,
        image,
        senderType: "host",
        date: new Date().toLocaleString(),
        isSchedule: req.body.isSchedule,
      });

      return res.status(200).json({
        status: true,
        message: "success",
        data: chat_,
        imagePath: req.file ? baseURL + req.file.path : null,
      });
    } else {
      deleteFile(req.file);
      return res.status(200).json({ status: false, message: "invalid detail" });
    }
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res.status(200).json({
      status: false,
      message: error.message || "server error",
    });
  }
};

//get chat thumb list
exports.index = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.userId);
    if (!user) {
      return res.status(200).json({ status: 404, message: "User does not Exist !!" });
    }
    let now = dayjs();

    const host = await Host.find().sort({ createdAt: -1 });

    const chat = await Chat.find({ user: req.query.userId }).distinct("host");

    const chatList = [];

    for (var i = 0; i < chat.length; i++) {
      let chat_ = await Chat.findOne({
        $and: [{ user: req.query.userId }, { host: chat[i] }, { isSchedule: false }],
      })
        .populate({
          path: "host",
          populate: {
            path: "language",
            model: "Language",
          },
        })
        .sort({ createdAt: -1 });

      let time = "";

      time =
        now.diff(chat_.createdAt, "minute") <= 60 && now.diff(chat_.createdAt, "minute") >= 0
          ? now.diff(chat_.createdAt, "minute") + " minutes ago"
          : now.diff(chat_.createdAt, "hour") >= 24
          ? now.diff(chat_.createdAt, "day") + " days ago"
          : now.diff(chat_.createdAt, "hour") + " hours ago";

      await chatList.push({
        msg: chat_.message,
        time: time === "0 minutes ago" ? "now" : time,
        id: chat_.host ? chat_.host._id : "",
        image: chat_.host ? chat_.host.image : "",
        name: chat_.host ? chat_.host.name : "",
        host: chat_.host ? chat_.host : null,
        createdAt: chat_.createdAt,
      });
    }

    const chat_ = chatList.filter((ele) => ele.host !== null);

    arraySort(chat_, "createdAt");

    return res.status(200).json({
      status: 200,
      message: "success",
      data: chat_.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.oldChat = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.userId);
    if (!user) {
      return res.status(200).json({ status: false, message: "User does not exist!!" });
    }

    const host = await Host.findById(req.query.hostId);
    if (!host) {
      return res.status(200).json({ status: false, message: "Host does not exist!!" });
    }

    const oldChat = await Chat.find({
      $and: [{ user: req.query.userId }, { host: req.query.hostId }, { isSchedule: false }],
    });

    return res.status(200).json({ status: 200, message: "success", oldChat });
  } catch (error) {
    console.log(error);
  }
};
