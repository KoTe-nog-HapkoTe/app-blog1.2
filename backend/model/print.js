const mongoose = require("mongoose")

const PrintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    colors: {
      type: String,
      require: true,
    },
    width: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Print", PrintSchema)