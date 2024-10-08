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

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
