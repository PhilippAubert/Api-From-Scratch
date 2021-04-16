const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  { name: String, type: String, location: String },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Course", PostSchema);
