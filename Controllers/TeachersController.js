const Teacher = require("../Models/Teacher");

const GetTeacher = async (req, res) => {
    try {
        const getTeacher = await Teacher.find(req.query);
        if (getTeacher) {
            res.status(200).send(getTeacher)
        }
        else {
            res.status(400).send(getTeacher)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const PostTeacher = async (req, res) => {

    try {
        const teacherData = req.body;
        console.log(teacherData.dob);
        const postTeacher = new Teacher(teacherData);
        const saved = await postTeacher.save();
        if (!saved) {
            return res.status(404).send();
        }

        return res.status(201).send(saved);
    }
    catch (e) {
        console.log(e);
    }
};

const PatchTeacher = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Teacher.findByIdAndUpdate(_id, req.body, {
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

const DeleteTeacher = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Teacher.findByIdAndDelete(_id)
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

module.exports = { GetTeacher, PostTeacher, PatchTeacher, DeleteTeacher };