const Student = require("../Models/Student");

const GetStudent = async (req, res) => {
    try {
        const getStudents = await Student.find(req.query);
        if (getStudents) {
            res.status(200).send(getStudents)
        }
        else {
            res.status(400).send(getStudents)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const PostStudent = async (req, res) => {
    try {
        const postStudent = new Student(req.body);
        const saved = await postStudent.save();
        if (saved) {
            res.status(201).send(saved)
        }
        else {
            res.status(404).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const PatchStudent = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Student.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        })
        if (saved) {
            res.status(201).send(saved)
        }
        else {
            res.status(404).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const DeleteStudent = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Student.findByIdAndDelete(_id)
        if (saved) {
            res.status(201).send(saved)
        }
        else {
            res.status(404).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const AddAttendance = async (req, res) => {
    try {
        const studentId = req.params.id; // Extract student ID from the route parameter
        const { date, status,attendancestatus } = req.body; // Extract date and status from the request body

        // Find the student by ID
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        // Add attendance for the student
        student.attendance.push({ date, status,attendancestatus });
        const saved = await student.save();

        if (saved) {
            res.status(201).send(saved);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
module.exports = { GetStudent, PostStudent, PatchStudent, DeleteStudent,AddAttendance };