import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

const register = async (req, res) => {
  try {
    const { username, password, role, fullName, email, phone, specialization, dateOfBirth, bloodGroup } = req.body;

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    const user = await User.create({
      username, password, role, fullName, email, phone,
      ...(role === 'doctor' && { specialization }),
      ...(role === 'patient' && { dateOfBirth, bloodGroup })
    });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      token,
      user: { id: user._id, username: user.username, role: user.role, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    console.log(err,'error')
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username });

    console.log('user',user)

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    console.log(token,'token')

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, role: user.role, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export { register, login };