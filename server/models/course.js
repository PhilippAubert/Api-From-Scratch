const mongoose = require("mongoose");

const { Schema } = mongoose;

exports.PostSchema = new Schema(
  { id: Schema.Types.ObjectId, name: String, type: String, location: String }
  // {
  //   timestamps: true,
  //   versionKey: false,
  // }
);
