const Student = require("../Models/Student");
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

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

         // Check if there is a file attached to the request
        //  if (req.file) {
        //     // Assuming 'image' is the field name in the form for the image file
        //     postStudent.image.data = req.file.buffer; // Store the image buffer in the 'data' field
        //     postStudent.image.contentType = req.file.mimetype; // Store the MIME type of the image
        // }
        const saved = await postStudent.save();
        if (saved) {
            res.status(201).send(saved)
        }
        else {
            res.status(404).send()
        }
    }
    catch (e) {
        console.log(e);
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
        console.log(e);
        res.status(500).send(e)
    }
};

const DeleteStudent = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Student.findByIdAndDelete(_id)
        if (saved) {
            res.status(201).send(true);
        }
        else {
            res.status(404).send({ error: "Something went wrong" });
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
};

const AddAttendance = async (req, res) => {
    try {
        const studentId = req.params.id; // Extract student ID from the route parameter
        const { date, status, attendancestatus } = req.body; // Extract date and status from the request body

        // Find the student by ID
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }

        // Add attendance for the student
        student.attendance.push({ date, status, attendancestatus });
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
module.exports = { GetStudent, PostStudent, PatchStudent, DeleteStudent, AddAttendance };