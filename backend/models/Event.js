import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  attractionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  description: {
    type: String,
    required: true
  }
},{timestamps:true});
const Event = mongoose.model('Event', eventSchema);
export default Event;