const mongoose = require("mongoose");
const model = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  contents: { type: String, required: true },
});

const dbContents = mongoose.model("Data",model);
module.exports=dbContents
 