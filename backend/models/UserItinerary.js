import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    eventIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    ratingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
},{timestamps:true});

const UserItinerary = mongoose.model('UserItinerary', itinerarySchema);
export default UserItinerary;
