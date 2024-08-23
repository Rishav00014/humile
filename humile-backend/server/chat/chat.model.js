const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
    },
    message: String,
    image: { type: String, default: null },
    senderType: String,
    isSchedule: { type: Boolean, default: true },
    date: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
