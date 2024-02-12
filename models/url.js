const mongoose = require("mongoose");

const urlScheme = new mongoose.Schema(
  {
    shortId: {
      type: String,
      requiured: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      requiured: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("url", urlScheme);

module.exports = URL;
