const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HostSchema = new Schema(
  {
    name: String,
    language: { type: Schema.Types.ObjectId, ref: "Language" },
    age: Number,
    bio: { type: String, default: null },
    image: { type: Array, default: [] },
    isOnline: { type: Boolean, default: true },
    isBusy: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
    isDisable: { type: Boolean, default: false },
    coin: { type: Number, default: 0 },
    isLogout: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    fromAPI: { type: Boolean, default: false },
    video: { type: String, default: "null" },
    videoType: { type: String, default: "link" },
    imageType: { type: String, default: "link" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Host", HostSchema);
