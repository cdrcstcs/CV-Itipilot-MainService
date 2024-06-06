import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

export const Image = mongoose.model('Image', imageSchema);

