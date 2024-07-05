import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import {createAttraction, getAllAttractions, getAttraction, updateAttraction, deleteAttraction} from "./controllers/Attraction.js";
import {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} from "./controllers/Event.js";
import {createUser, getAllUsers, loginUser, getUser, updateUser, getProfile} from "./controllers/User.js";
import {createItinerary, getAllItineraries, getItinerary, updateItinerary, deleteItinerary} from "./controllers/Itinerary.js";
import {saveUserItinerary, getAllUserItineraries, getAllUserSavedItinerary, updateUserItinerary, deleteUserItinerary} from "./controllers/UserItinerary.js";
import {createRating, getAllRatings, getRating, updateRating, deleteRating} from "./controllers/Rating.js";
import {createTag, getAllTags, getTag, updateTag, deleteTag} from "./controllers/Tag.js";
import { searchItinerary } from './controllers/Search.js';
import { getDataOfUser } from './controllers/UserData.js';
import { uploadImage } from './controllers/Image.js';
import { getImageById } from './controllers/Image.js';
import mongoose from 'mongoose';
import Image from './models/Image.js';
import User from './models/User.js';
import Tag from './models/Tag.js';
import Rating from './models/Rating.js';
import Attraction from './models/Attraction.js';
import Event from './models/Event.js';
import Itinerary from './models/Itinerary.js';
import { generateUsers, generateEvents, generateItineraries, generateImageData, generateTags, generateRatings, generateAttractions } from './data.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: true,
}));
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
async function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.cookies && req.cookies.usertoken; // Check if token exists in req.cookies
    // console.log("ll"+token);
    if (!token) {
      reject(new Error('Token not found in cookies')); // Reject if token is not found
    } else {
      jwt.verify(req.cookies.usertoken, jwtSecret, {}, (err, userData) => {
        if (err) {
          reject(err); 
        } else {
          req.userData = userData;
          resolve(); 
          }
          });
    }
  })
  .then(() => {
    next(); // Call next() if the token is verified successfully
  })
  .catch(err => {
    res.status(401).send(err); // Handle authentication failure
    });
  }
app.use(express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), uploadImage);
app.get('/images/:id', verifyToken, getImageById);
app.post('/userdata', getDataOfUser);
app.post('/attractions', verifyToken, createAttraction);
app.get('/attractions', verifyToken, getAllAttractions);
app.get('/attractions/:id', verifyToken, getAttraction);
app.put('/attractions/:id', verifyToken, updateAttraction);
app.delete('/attractions/:id', verifyToken, deleteAttraction);
app.post('/events', verifyToken, createEvent);
app.get('/events', verifyToken, getAllEvents);
app.get('/events/:id', verifyToken, getEvent);
app.put('/events/:id', verifyToken, updateEvent);
app.delete('/events/:id', verifyToken, deleteEvent);
app.post('/itinerary', verifyToken, createItinerary);
app.get('/itinerary', verifyToken, getAllItineraries);
app.get('/itinerary/:id', verifyToken, getItinerary);
app.put('/itinerary/:id', verifyToken, updateItinerary);
app.delete('/itinerary/:id', verifyToken, deleteItinerary);
app.get('/saved/:itiId', verifyToken, saveUserItinerary);
app.get('/saved', verifyToken, getAllUserSavedItinerary);
app.put('/saved/:id', verifyToken, updateUserItinerary);
app.delete('/saved/:id', verifyToken, deleteUserItinerary);
app.get('/user_itinerary', verifyToken, getAllUserItineraries);
app.put('/user_itinerary/:id', verifyToken, updateUserItinerary);
app.delete('/user_itinerary/:id', verifyToken, deleteUserItinerary);
app.post('/tags', verifyToken, createTag);
app.get('/tags', verifyToken, getAllTags);
app.get('/tags/:id', verifyToken, getTag);
app.put('/tags/:id', verifyToken, updateTag);
app.delete('/tags/:id', verifyToken, deleteTag);
app.post('/ratings', verifyToken, createRating);
app.get('/ratings', verifyToken, getAllRatings);
app.get('/ratings/:id', verifyToken, getRating);
app.put('/ratings/:id', verifyToken, updateRating);
app.delete('/ratings/:id', verifyToken, deleteRating);
app.post('/register', createUser);
app.post('/login', loginUser);
app.get('/users', verifyToken, getAllUsers);
app.get('/users/:id', verifyToken, getUser);
app.put('/users', verifyToken, updateUser);
app.get('/profile', verifyToken, getProfile);
app.get('/search', searchItinerary);
const MONGO_URL = "mongodb://localhost:27017/mongo-golang";
const PORT = 4000;
mongoose.connect(MONGO_URL).then(async () => {
  await Image.deleteMany();
  await User.deleteMany();
  await Tag.deleteMany();
  await Rating.deleteMany();
  await Attraction.deleteMany();
  await Event.deleteMany();
  await Itinerary.deleteMany();
  await Image.insertMany(generateImageData());
  await User.insertMany(await generateUsers());
  await Tag.insertMany(generateTags());
  await Rating.insertMany(generateRatings());
  await Attraction.insertMany(await generateAttractions());
  await Event.insertMany(await generateEvents());
  await Itinerary.insertMany(await generateItineraries());
  app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));