// controllers/attendanceController.js
const Attendance = require('../Models/Attendance');
const Student = require('../Models/Student');

// Create a new attendance record
const postAttendance = async (req, res) => {
  try {
    const { studentId, date } = req.body;

    // Find the student by ID
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create a new attendance record
    const attendance = new Attendance({
      student: student._id,
      date,
    });

    await attendance.save();

    res.status(201).json({ message: 'Attendance record created', attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  postAttendance,
};
