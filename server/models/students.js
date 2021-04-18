const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  { firstName: String, lastName: String, location: String, course: String },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Students", PostSchema);
