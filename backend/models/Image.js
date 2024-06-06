import { Type } from "@aws-sdk/client-s3";
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
});
const Image = mongoose.model('Image', imageSchema);


export default Image;