const Session = require("../Models/Session");
const Subject = require("../Models/Subject");
const Course = require("../Models/Course");

const GetSession = async (req, res) => {
    try {
        const getSessions = await Session.find(req.query);
        if (getSessions) {
            res.status(200).send(getSessions)
        }
        else {
            res.status(400).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const GetSubject = async (req, res) => {
    try {
        const getSubjects = await Subject.find(req.query);
        if (getSubjects) {
            res.status(200).send(getSubjects)
        }
        else {
            res.status(400).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const GetCourse = async (req, res) => {
    try {
        const getCourses = await Course.find(req.query);
        if (getCourses) {
            res.status(200).send(getCourses)
        }
        else {
            res.status(400).send()
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const PostSession = async (req, res) => {
    try {
        const postSessions = new Session(req.body);
        const saved = await postSessions.save();
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

const PostSubject = async (req, res) => {
    try {
        const postSubjects = new Subject(req.body);
        const saved = await postSubjects.save();
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

const PostCourse = async (req, res) => {
    try {
        const postCourses = new Course(req.body);
        const saved = await postCourses.save();
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

const PatchSession = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Session.findByIdAndUpdate(_id, req.body, {
            new: true
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

const PatchSubject = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Subject.findByIdAndUpdate(_id, req.body, {
            new: true
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

const PatchCourse = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Course.findByIdAndUpdate(_id, req.body, {
            new: true
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

const DeleteSession = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Session.findByIdAndDelete(_id)
        if (saved) {
            res.status(201).send(true)
        }
        else {
            res.status(404).send(false)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const DeleteSubject = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Subject.findByIdAndDelete(_id)
        if (saved) {
            res.status(201).send(true)
        }
        else {
            res.status(404).send(false)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

const DeleteCourse = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await Course.findByIdAndDelete(_id)
        if (saved) {
            res.status(201).send(true)
        }
        else {
            res.status(404).send(false)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

module.exports = {
    GetSession, GetSubject, GetCourse,
    PostSession, PostSubject, PostCourse,
    PatchSession, PatchSubject, PatchCourse,
    DeleteSession, DeleteSubject, DeleteCourse
};