// controllers/attendanceController.js
const Attendance = require('../Models/Attendance');
const Student = require('../Models/Student');

// Create a new attendance record
const MarkAttendance = async (req, res) => {
  try {
    const { studentId, isPresent } = req.body;
    const attendance = new Attendance({ studentId: studentId, isPresent });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const MarkAllAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;
    // Assuming attendanceData is an array of objects with studentId and isPresent
    await Promise.all(attendanceData.map(async ({ studentId, isPresent, subjectId }) => {
      // Update or create attendance record for each student
      await Attendance.findOneAndUpdate(
        { studentId: studentId, subjectId: subjectId, date: new Date().toISOString().split('T')[0] }, // Assuming daily attendance
        { studentId: studentId, subjectId: subjectId, date: new Date().toISOString().split('T')[0], isPresent },
        { upsert: true }
      );
    }));
    console.log("Attendance marked for all students successfully");
    res.status(201).json({ message: 'Attendance marked for all students successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get attendance for a specific student
const GetStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendance = await Attendance.find({ student: studentId }).populate('student');
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get students by subject and semester, including attendance data for the current date
const GetStudentsBySubjectAndSemester = async (req, res) => {
  try {
    console.log("Hello...",req.params);
    const { subjectId, semester } = req.params;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Fetch students by subject and semester
    const students = await Student.find({ subjectId, semester });
    
    // Fetch attendance records for the current date
    const attendanceRecords = await Attendance.find({ subjectId, date: currentDate });

    // Create a map of attendance records for quick lookup
    const attendanceMap = new Map();
    attendanceRecords.forEach(record => {
      attendanceMap.set(record.studentId.toString(), record.isPresent);
    });

    // Combine student data with attendance information
    const studentsWithAttendance = students.map(student => ({
      studentId: student._id,
      name: student.name,
      subjectId: student.subjectId,
      semester: student.semester,
      isPresent: attendanceMap.has(student._id.toString()) ? attendanceMap.get(student._id.toString()) : false
    }));

    res.status(200).json(studentsWithAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  GetStudentAttendance,
  MarkAllAttendance,
  MarkAttendance,
  GetStudentsBySubjectAndSemester
};
