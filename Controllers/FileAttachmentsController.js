const FileAttachments = require("../Models/FileAttachments");
const multer = require('multer');
const upload = multer(); //{ storage: storage }


const PostAttachment = async (req, res) => {
    try {
        const imageData = req.file.buffer;
        const { studentId } = req.body;
        console.log(req.file);
        //console.log(studentId);
        const newAttachment = new FileAttachments({
            studentId: studentId,
            data: imageData,
            fileType: req.file.mimetype,
            fileName: req.file.originalname,
            fieldname: req.file.fieldname,
        });

        const savedFile = await newAttachment.save();
        if (savedFile) {
            res.status(201).send(savedFile)
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


const PatchAttachment = async (req, res) => {
    try {
        const _id = req.params.id;
        // Ensure multer middleware is used to handle file uploads
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).send({ error: 'Error handling file upload.' });
            }

            // Access the file data from req.file
            const fileData = req.file;

            // Update other fields in the document (assuming they are part of req.body)
            const saved = await FileAttachments.findByIdAndUpdate(_id, {
                data: fileData.buffer, // Assuming 'data' is the field storing binary data
                fileType: fileData.mimetype,
                fileName: fileData.originalname,
                fieldname: fileData.fieldname,
            }, {
                new: true,
                runValidators: true,
            });

            if (saved) {
                return res.status(201).send(saved);
            } else {
                return res.status(404).send();
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

const DeleteAttachment = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await FileAttachments.findOneAndDelete({ studentId: _id });
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

module.exports = { PatchAttachment, PostAttachment, DeleteAttachment };