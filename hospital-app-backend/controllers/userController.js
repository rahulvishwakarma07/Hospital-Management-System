import { User } from "../models/User.js";

// GET /api/users/patients
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }, { password: 0 });
    res.json({ success: true, count: patients.length, data: patients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/users/doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }, { password: 0 });
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getPatients, getDoctors, getUserById };