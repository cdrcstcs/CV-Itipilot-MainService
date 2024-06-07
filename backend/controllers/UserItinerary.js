import UserItinerary from "../models/UserItinerary.js";

async function createUserItinerary(req, res) {
  try {
    const { _id, ...itineraryData } = req.body; // Exclude _id from itineraryData
    console.log('ok');
    console.log(itineraryData);
    const itinerary = await UserItinerary.create(itineraryData);
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read all itineraries
async function getAllUserItineraries(req, res) {
  try {
    // console.log('ok');
    const itineraries = await UserItinerary.find();
    // console.log(itineraries);
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read single itinerary by ID
async function getUserItinerary(req, res) {
  try {
    const itinerary = await UserItinerary.findById(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update itinerary by ID
async function updateUserItinerary(req, res) {
  try {
    const itinerary = await UserItinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete itinerary by ID
async function deleteUserItinerary(req, res) {
  try {
    const itinerary = await UserItinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createUserItinerary, getAllUserItineraries, getUserItinerary, updateUserItinerary, deleteUserItinerary };
