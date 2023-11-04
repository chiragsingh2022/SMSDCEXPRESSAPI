const bcrypt = require('bcrypt');
const User = require("../Models/User");

const GetUser = async (req, res) => {
    try {
        const getUsers = await User.find(req.query);
        if (getUsers) {
            res.status(200).send(getUsers)
        }
        else {
            res.status(400).send(getUsers)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
};

// const PostUser = async (req, res) => {
//     try {
//         const postUser = new User(req.body);
//         const saved = await postUser.save();
//         if (saved) {
//             res.status(201).send(saved)
//         }
//         else {
//             res.status(404).send()
//         }
//     }
//     catch (e) {
//         res.status(500).send(e)
//     }
// };

const PostUser = async (req, res) => {
    try {
        const { userid, password, userType } = req.body;

        // Step 1: Hash the user's password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Step 2: Create a new user with the hashed password
        const newUser = new User({
            userid,
            password: hashedPassword,
            userType,
        });

        // Step 3: Save the user to the database
        console.log(newUser);
        const saved = await newUser.save();

        if (saved) {
            res.status(201).send(saved);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};


const PatchUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await User.findByIdAndUpdate(_id, req.body, {
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

const DeleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const saved = await User.findByIdAndDelete(_id)
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

module.exports = {GetUser,PostUser,PatchUser,DeleteUser};