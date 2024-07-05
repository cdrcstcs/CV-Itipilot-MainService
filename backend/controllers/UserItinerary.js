import Itinerary from "../models/Itinerary.js";
import User from "../models/User.js";
async function saveUserItinerary(req, res) {
  console.log('htllo');
  try {
    const itiId = req.params.itiId; // Exclude _id from itineraryData
    console.log("heelo " + itiId);
    console.log(req.userData);
    const user = await User.findById(req.userData.userId);
    console.log(user);
    user.savedItinerary.push(itiId);
    user.save();
    res.status(201).json("ok");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllUserSavedItinerary(req, res) {
  try {
    const user = await User.findById(req.userData.userId);
    const itineraries = await Itinerary.find({_id:{'$in': user.savedItinerary}});
    res.status(201).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getAllUserItineraries(req, res) {
  try {
    const itineraries = await Itinerary.find({userId: req.userData.userId});
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function updateUserItinerary(req, res) {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteUserItinerary(req, res) {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export { saveUserItinerary, getAllUserItineraries, getAllUserSavedItinerary, updateUserItinerary, deleteUserItinerary };
