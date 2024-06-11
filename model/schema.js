const mongoose = require("mongoose");
const User=require('./user')
const model = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  contents: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "users" },
});

const dbContents = mongoose.model("Data",model);
module.exports=dbContents
 