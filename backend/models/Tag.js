import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  }
});
const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;

