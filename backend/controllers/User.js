import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

// Create user
async function createUser(req, res) {
  try {
    const { imageId ,name, email, password, userType } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const user = await User.create({
      imageId,
      name,
      email,
      password: hashedPassword,
      userType
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login user
async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

// Read all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read single user by ID
async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update user by ID
async function updateUser(req, res) {
  try {
    const userData = req.userData;
    const user = await User.findByIdAndUpdate(userData.userId, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Get profile of logged-in user
async function getProfile(req, res) {
  try {
    // Retrieve user data from request
    const userData = req.userData;

    // Find user by ID
    const user = await User.findById(userData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createUser, loginUser, getAllUsers, getUser, updateUser, getProfile };
