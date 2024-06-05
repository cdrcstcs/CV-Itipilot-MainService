import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import {createAttraction, getAllAttractions, getAttraction, updateAttraction, deleteAttraction} from "./controllers/Attraction.js";
import {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} from "./controllers/Event.js";
import {createUser, getAllUsers, loginUser, getUser, updateUser, getProfile} from "./controllers/User.js";
import {createItinerary, getAllItineraries, getItinerary, updateItinerary, deleteItinerary} from "./controllers/Itinerary.js";
import {createRating, getAllRatings, getRating, updateRating, deleteRating} from "./controllers/Rating.js";
import {createTag, getAllTags, getTag, updateTag, deleteTag} from "./controllers/Tag.js";
import { getDataOfUser } from './controllers/UserData.js';
import connectToDb from './db/db.js';
connectToDb();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.cookies && req.cookies.token; // Check if token exists in req.cookies
    if (!token) {
      reject(new Error('Token not found in cookies')); // Reject if token is not found
    } else {
      // console.log('backend'+req.cookies.token);
      jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
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

app.get('/userdata', getDataOfUser);

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

app.listen(4000, 'localhost');