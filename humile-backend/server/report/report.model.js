const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    host: { type: mongoose.Schema.Types.ObjectId, ref: "Host" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: String,
    date: { type: String, default: new Date().toLocaleString() }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = mongoose.model("Report", reportSchema);
