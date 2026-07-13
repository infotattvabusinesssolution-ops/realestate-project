import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, city } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer',
      phone: phone || '',
      city: city || '',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email (and select password field)
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        city: user.city,
        state: user.state,
        zip: user.zip,
        address: user.address,
        avatar: user.avatar,
        rating: user.rating,
        experience: user.experience,
        specialization: user.specialization,
        businessName: user.businessName,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.city = req.body.city !== undefined ? req.body.city : user.city;
      user.state = req.body.state !== undefined ? req.body.state : user.state;
      user.zip = req.body.zip !== undefined ? req.body.zip : user.zip;
      user.address = req.body.address !== undefined ? req.body.address : user.address;
      user.avatar = req.body.avatar || user.avatar;
      
      // Update role-specific fields
      if (user.role === 'vendor') {
        user.businessName = req.body.businessName !== undefined ? req.body.businessName : user.businessName;
        user.experience = req.body.experience !== undefined ? req.body.experience : user.experience;
        user.specialization = req.body.specialization !== undefined ? req.body.specialization : user.specialization;
      } else if (user.role === 'agent') {
        user.experience = req.body.experience !== undefined ? req.body.experience : user.experience;
        user.specialization = req.body.specialization !== undefined ? req.body.specialization : user.specialization;
        user.city = req.body.city || user.city;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        city: updatedUser.city,
        state: updatedUser.state,
        zip: updatedUser.zip,
        address: updatedUser.address,
        avatar: updatedUser.avatar,
        rating: updatedUser.rating,
        experience: updatedUser.experience,
        specialization: updatedUser.specialization,
        businessName: updatedUser.businessName,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Change user passwords
// @route   PUT /api/auth/change-password
// @access  Private
export const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id).select('+password');

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
