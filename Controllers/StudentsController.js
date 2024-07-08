const FileAttachments = require("../Models/FileAttachments");
const Student = require("../Models/Student");

const SearchStudent = async (req, res) => {
    const { name, email, phoneNumber, admissionNumber } = req.query; // Assuming 'chirag' is provided in either the name or email field
    let query = {};
    if (name) {
        const nameParts = name.split(' '); // Split the full name into parts
        if (nameParts.length === 3) {
            query = {
                $or: [
                    {
                        $and: [
                            { fname: { $regex: new RegExp(nameParts[0], 'i') } },
                            { mname: { $regex: new RegExp(nameParts[1], 'i') } },
                            { lname: { $regex: new RegExp(nameParts[2], 'i') } }
                        ]
                    },
                ]
            };
        }
        else if (nameParts.length === 2) {
            query = {
                $or: [
                    {
                        $and: [
                            { fname: { $regex: new RegExp(nameParts[0], 'i') } },
                            { lname: { $regex: new RegExp(nameParts[1], 'i') } }
                        ]
                    },
                ]
            };
        }
        else {
            query = {
                $or: [
                    { fname: { $regex: new RegExp(nameParts[0], 'i') } },
                    { mname: { $regex: new RegExp(nameParts[0], 'i') } },
                    { lname: { $regex: new RegExp(nameParts[0], 'i') } },
                    // Add other conditions for email, studentid, phonenumber if needed
                ]
            };
        }
    }
    else if (email) {
        query = {
            email: { $regex: email, $options: "i" }
        }
    }
    else if (phoneNumber) {
        query = {
            phoneNumber: { $regex: phoneNumber, $options: "i" }
        }
    }
    else if (admissionNumber) {
        query = {
            admissionNumber: { $regex: admissionNumber, $options: "i" }
        }
    }

    try {
        const getStudents = await Student.find(query).limit(10);
        if (getStudents) {
            res.status(200).send(getStudents)
        }
        else {
            res.status(400).send("no student find")
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const SearchStudentByClass = async (req, res) => {
    const { session, course, semester } = req.query;
    console.log(req.query);
    let query = {};
    if (session && course && semester) {
        query = {
            $and: [
                { session: { $regex: new RegExp(session, 'i') } },
                { course: { $regex: new RegExp(course, 'i') } },
                { semester: { $regex: new RegExp(semester, 'i') } }
            ]
        };        
    }
    try {
        const getStudents = await Student.find(query);
        if (getStudents) {
            res.status(200).send(getStudents)
        }
        else {
            res.status(400).send("no student find")
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

// const GetStudent = async (req, res) => {

//     try {
//         const getStudents = await Student.find();
//         if (getStudents) {

//             res.status(200).send(getStudents)
//         }
//         else {
//             res.status(400).send("no student find")
//         }
//     }
//     catch (e) {
//         res.status(500).send(e)
//     }
// };

const GetStudent = async (req, res) => {
    try {
        const getStudents = await Student.find();

        if (getStudents) {
            // Map through each student and fetch the corresponding fileattachment data
            const studentsWithFileAttachments = await Promise.all(getStudents.map(async (student) => {
                const fileAttachment = await FileAttachments.findOne({ studentId: student._id });

                // If fileattachment data is found, append it to the student object
                if (fileAttachment) {
                    return {
                        ...student.toObject(),  // Convert student to plain JavaScript object
                        fileAttachment: {
                            _id: fileAttachment._id,
                            data: fileAttachment.data,
                            fileType: fileAttachment.fileType,
                        },
                    };
                } else {
                    // If no fileattachment data is found, just return the student object
                    return student.toObject();
                }
            }));

            res.status(200).send(studentsWithFileAttachments);
        } else {
            res.status(400).send("No students found");
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const PostStudent = async (req, res) => {
    try {
        const postStudent = new Student(req.body);
        const saved = await postStudent.save();

        if (!saved) {
            return res.status(404).send();
        }

        return res.status(201).send(saved);
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
        const admissionNumber = req.params.id; // Extract student ID from the route parameter
        const { date, status, attendancestatus } = req.body; // Extract date and status from the request body

        // Find the student by ID
        const student = await Student.findById(admissionNumber);

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

const promoteToNextSemester = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch the current student record
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Extract relevant details from the current semester
        const {
            semester,
            course,
            session,
            // ... other semester-related details
        } = student;

        // Create a new object representing the current semester
        const currentSemesterDetails = {
            semester,
            course,
            session,
            // ... other semester-related details
        };

        // Update the semesterHistory array with the current semester details
        student.semesterHistory = [...student.semesterHistory, currentSemesterDetails];

        // Update the student's details for the next semester
        student.semester = getNextSemester(semester);
        student.session = getNextSession(session);

        // Save the updated student record
        await student.save();

        res.status(200).json({ message: 'Student promoted to the next semester successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to determine the next semester (you can customize this based on your semester naming convention)
const getNextSemester = (currentSemester) => {
    const semesterNumber = parseInt(currentSemester, 10);

    if (!isNaN(semesterNumber)) {
        // If the conversion to a number is successful
        const nextSemesterNumber = semesterNumber + 1;
        return nextSemesterNumber.toString();
    }

    // If the current semester is not a valid number
    return currentSemester;
};

const getNextSession = (currentSession) => {
    // Split the session string into starting and ending years
    const [startYear, endYear] = currentSession.split("-");

    // Convert years to numbers and increment them by 1
    const nextStartYear = parseInt(startYear, 10) + 1;
    const nextEndYear = parseInt(endYear, 10) + 1;

    // Construct the new session string
    const nextSession = `${nextStartYear}-${nextEndYear}`;

    return nextSession;
};

const PromoteStudent = async (req, res) => {
    try {
      const { admissionNumber } = req.params;
      
      // Find the student by admission number
      const student = await Student.findOne({ admissionNumber });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Convert semester to number, increment, and convert back to string
      let currentSemester = parseInt(student.semester);
      if (isNaN(currentSemester)) {
        return res.status(400).json({ error: 'Invalid semester format' });
      }
      let nextSemester = (currentSemester + 1).toString();
  
      // Update the student's semester
      student.semester = nextSemester;
      await student.save();
  
      res.status(200).json({ message: `Student promoted to semester ${nextSemester}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { GetStudent, SearchStudent,PromoteStudent, SearchStudentByClass, PostStudent, PatchStudent, DeleteStudent, AddAttendance };