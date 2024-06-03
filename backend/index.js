import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {createAttraction, getAllAttractions, getAttraction, updateAttraction, deleteAttraction} from "./controllers/Attraction";
import {createEvent, getAllEvents, getEvent, updateEvent, deleteEvent} from "./controllers/Event";
import {createUser, getAllUsers, loginUser, getUser, updateUser, deleteUser, logoutUser, getProfile} from "./controllers/User";
import {createItinerary, getAllItineraries, getItinerary, updateItinerary, deleteItinerary} from "./controllers/Itinerary";
import {createRating, getAllRatings, getRating, updateRating, deleteRating} from "./controllers/Rating";
import {createTag, getAllTags, getTag, updateTag, deleteTag} from "./controllers/Tag";

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

function verifyToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) {
        reject(err); 
      } else {
        req.userData = userData;
        resolve(); 
      }
    });
  });
}

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

app.post('/users', createUser);
app.post('/login', loginUser);
app.get('/users', verifyToken, getAllUsers);
app.get('/users/:id', verifyToken, getUser);
app.put('/users/:id', verifyToken, updateUser);
app.delete('/users/:id', verifyToken, deleteUser);
app.get('/users/profile', verifyToken, userProfile);
app.post('users/logout', logoutUser); 
app.listen(4000, 'localhost', debug=true);