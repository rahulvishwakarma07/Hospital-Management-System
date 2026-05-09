import { Appointment } from '../models/Appointment.js';
import { User } from '../models/User.js';

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason, notes } = req.body;

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check slot availability
    const existing = await Appointment.findOne({
      doctor: doctorId,   
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: 'booked'
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }

    const patientId = req.user.role === 'patient' ? req.user._id : req.body.patientId;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      reason,
      notes
    });

    await appointment.populate([
      { path: 'patient', select: '-password' },
      { path: 'doctor', select: '-password' }
    ]);

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'This time slot is already booked' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only patient who booked or doctor can cancel
    const isPatient = appointment.patient.toString() === req.user._id.toString();
    const isDoctor = appointment.doctor.toString() === req.user._id.toString();
    if (!isPatient && !isDoctor) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Appointment is already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ success: true, message: 'Appointment cancelled successfully', data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    }

    // Optional filters
    if (req.query.status) query.status = req.query.status;
    if (req.query.doctorId) query.doctor = req.query.doctorId;
    if (req.query.patientId) query.patient = req.query.patientId;

    const appointments = await Appointment.find(query)
      .populate('patient', '-password')
      .populate('doctor', '-password')
      .sort({ appointmentDate: -1 });

    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', '-password')
      .populate('doctor', '-password');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { bookAppointment, cancelAppointment, getAppointments, getAppointmentById };