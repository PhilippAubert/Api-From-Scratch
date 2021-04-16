const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  { studentId: Number, firstName: String, lastName: String, course: String },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Students", PostSchema);
