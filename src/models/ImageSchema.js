const { Schema, model } = require("mongoose");

const ImgSchema = new Schema({
  title: { type: "string" },
  description: { type: "string" },
  filename: { type: "string" },
  path: { type: "string" },
  orinalname: { type: "string" },
  mimetype: { type: "string" },
  size: { type: "Number" },
  created_at: { type: "Date", default: Date.now() },
  last_modified: { type: "Date" },
});

module.exports = model("image", ImgSchema);
