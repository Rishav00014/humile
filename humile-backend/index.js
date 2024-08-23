const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/storage", express.static(path.join(__dirname, "storage")));

const FCM = require("fcm-node");
const { SERVER_KEY } = require("./config");
const fcm = new FCM(SERVER_KEY);

// model
const Chat = require("./server/chat/chat.model");
const Message = require("./server/message/message.model");
const User = require("./server/user/user.model");
const Host = require("./server/host/host.model");

//nodeCron
const nodeCron = require("node-cron");

//socket io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const shuffleArray = require("./util/shuffle");

app.use(express.json());
app.use(cors());

const config = require("./config");

//language route
const LanguageRoute = require("./server/language/language.route");
app.use("/language", LanguageRoute);

//Host Call history route
const HostCallHistoryRoute = require("./server/hostCallHistory/hostCallHistory.route");
app.use("/", HostCallHistoryRoute);

//user route
const UserRoute = require("./server/user/user.route");
app.use("/user", UserRoute);

//game route
const GameRoute = require("./server/game/game.route");
app.use("/game", GameRoute);

//user route
const CategoryRoute = require("./server/category/category.route");
app.use("/category", CategoryRoute);

//host route
const HostRoute = require("./server/host/host.route");
app.use("/host", HostRoute);

//admin route
const adminRoute = require("./server/admin/admin.route");
app.use("/admin", adminRoute);

//complaint route
const ComplaintRoute = require("./server/complaint/complaint.route");
app.use("/complaint", ComplaintRoute);

//favorite route
const FavoriteRoute = require("./server/favorite/favorite.route");
app.use("/favorite", FavoriteRoute);

//setting route
const SettingRoute = require("./server/setting/setting.route");
app.use("/setting", SettingRoute);

//plan route
const PlanRoute = require("./server/plan/plan.route");
app.use("/plan", PlanRoute);

//history
const HistoryRoute = require("./server/history/history.route");
app.use("/", HistoryRoute);

//notification
const NotificationRoute = require("./server/notification/notification.route");
app.use("/notification", NotificationRoute);

//dashboard
const DashboardRoute = require("./server/dashboard/dashboard.route");
app.use("/dashboard", DashboardRoute);

//advertisement route
const AdvertisementRoute = require("./server/advertisement/advertisement.route");
app.use("/advertisement", AdvertisementRoute);

//banner route
const BannerRoute = require("./server/banner/banner.route");
app.use("/banner", BannerRoute);

// report route
const ReportRoute = require("./server/report/report.route");
app.use("/report", ReportRoute);

//message route
const MessageRoute = require("./server/message/message.route");
app.use("/message", MessageRoute);

//chat route
const ChatRoute = require("./server/chat/chat.route");
app.use("/chat", ChatRoute);

app.get("/*", function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose.connect(`mongodb+srv://doadmin:W902Q534Kc1Df8Yr@db-mongodb-blr1-68075-70b47fe3.mongo.ondigitalocean.com/humileDB?tls=true&authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { fromAPI } = require("./server/host/host.controller");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", async () => {
  console.log("MONGO: successfully connected to db");

  setInterval(async () => {
    // await fromAPI();
  }, 1000);

  `*/${Math.floor(Math.random() * 5) + 1} * * * * `;

  await nodeCron.schedule(`0 */5 * * *`, async () => {
    const chat = await Chat.findOne({ isSchedule: true }).populate([
      {
        path: "host",
        populate: {
          path: "language",
          model: "Language",
        },
      },
      {
        path: "user",
        model: "User",
      },
    ]);

    if (chat) {
      chat.isSchedule = false;
      await chat.save();
      const payload = {
        to: chat.user.fcmToken,
        notification: {
          body: chat.message,
          title: chat.host.name,
          android_channel_id: "message",
        },
        android_channel_id: "message",
        data: {
          android_channel_id: "message",
          type: "chat",
          data: chat.host,
        },
      };
      await fcm.send(payload, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err);
        }
      });
    }

    let query = {};
    if (chat) {
      query = {
        isBlock: false,
        isLogout: false,
        isDeleted: false,
        _id: { $ne: chat.user._id },
        fcmToken: { $ne: null },
      };
    } else {
      query = {
        isBlock: false,
        isLogout: false,
        isDeleted: false,
        fcmToken: { $ne: null },
      };
    }

    const msgArray = [
      { question: "hii" },
      { question: "hlw" },
      { question: "heyy" },
      { question: "hey" },
      { question: "hello" },
      { question: "hi" },
      { question: "good morning" },
      { question: "good night" },
      { question: "good noon" },
      { question: "good evening" },
      { question: "sweet dreams" },
      { question: "take care" },
      { question: "bye" },
      { question: "good afternoon" },
      { question: "say else" },
      { question: "yeah!!" },
      { question: "😍😍🥰" },
      { question: "😛🤩😎" },
      { question: "😘😗😉" },
      { question: "😊" },
      { question: "what is your dream ?" },
    ];

    const messages = await Message.find().select({ question: 1, _id: 0 }).sort({ createdAt: -1 });
    const users = await User.find(query).sort({ createdAt: -1 });
    const hosts = await Host.find({ isDeleted: false }).populate("language").sort({ createdAt: -1 });

    const newArray = await messages.concat(msgArray);

    shuffleArray(hosts);

    await users.map(async (user) => {
      shuffleArray(newArray);
      const chat = await Chat.create({
        user: user._id,
        host: hosts[0]._id,
        message: newArray[0].question,
        isSchedule: false,
        date: new Date().toLocaleString(),
        senderType: "host",
      });

      const payload = {
        to: user.fcmToken,
        notification: {
          body: chat.message,
          title: hosts[0].name,
          android_channel_id: "message",
        },
        android_channel_id: "message",
        data: {
          android_channel_id: "message",
          type: "chat",
          data: hosts[0] ? hosts[0] : null,
        },
      };

      await fcm.send(payload, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err);
        }
      });
    });
  });
});

io.on("connect", (socket) => {
  const { globalRoom } = socket.handshake.query;
  const { loginRoom } = socket.handshake.query;
  const { hostLoginRoom } = socket.handshake.query;

  socket.join(globalRoom);
  socket.join(loginRoom);
  socket.join(hostLoginRoom);

  socket.on("callRequest", (data) => {
    // console.log("call request " + data);
    io.in(globalRoom).emit("callRequest", data);
  });

  socket.on("callAnswer", (data) => {
    // console.log("callAnswer " + data);
    io.in(globalRoom).emit("callAnswer", data);
  });

  socket.on("login", (user) => {
    // console.log("login user " + user);
    io.in(loginRoom).emit("login", user);
  });

  socket.on("hostLogin", (host) => {
    // console.log("Host login " + host);
    io.in(hostLoginRoom).emit("hostLogin", host);
  });
});

//start the server
server.listen(config.PORT, () => {
  console.log("Magic happens on port " + config.PORT);
});
