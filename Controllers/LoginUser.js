// const Login = require('../Models/User');

// const PostLogin = async (req, res) => {
//     try {
//         const userid = req.body.userid;
//         const password = req.body.password;
//         const crediantial = await Login.findOne({userid});
//         console.log(crediantial.password);
//         if(crediantial.password === password)
//         {
//             res.status(200).send(crediantial);
//         }
//         else
//         {
//             res.status(401).send("Wrong Credentials");
//         }
//     }
//     catch (e) {
//         res.status(500).send(e)
//     }
// };

// module.exports = PostLogin;


const bcrypt = require('bcryptjs'); // Import the bcrypt library for password hashing
const Login = require('../Models/User'); // Replace 'your-login-model' with the actual model you're using
const { jwt } = require('./Jwt');
const { Console } = require('console');

const PostLogin = async (req, res) => {
    try {
        const userid = req.body.userid;
        //const userType = req.body.userType;
        const password = req.body.password;
        // Step 1: Find the user by their userid
        const user = await Login.findOne({ userid });

        if (!user) {
            // Step 2: If the user is not found, return an error
            return res.status(404).send({error:"User not found"});
        }

        // Step 3: Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Step 4: If passwords match, send a success response
            //console.log("Logged in")
            jwt.sign({ user }, process.env.jwtKey, { expiresIn: "5h" }, (err, token) => {
                if (err) {
                    res.send({ error: "something went wrong, please try after some time" });
                }
                // const user = {
                //     fname: usr.fname,
                //     lname: usr.lname,
                //     userid: usr.userid,
                //     canviewrss: usr.canviewrss,
                //     canviewregistration: usr.canviewregistration,
                //     canviewstudent: usr.canviewstudent,
                //     candeletestudent:usr.candeletestudent,
                //     canaddstudent:usr.canaddstudent,
                //     canupdatestudent:usr.canupdatestudent
                // };
                user.password = undefined;
                user._id = null;
                res.status(200).send({ user, auth: token });
            })
        }
        else {
            // Step 5: If passwords do not match, send an error response
            res.status(401).send({error:"Wrong credentials"});
        }
    } 
    catch (e) {
        if (e._message === 'User validation failed') {
            res.status(400).send({ error: 'Invalid Email Format.' });
        }
        else{
        console.error(e);
        res.status(500).send({error:"Server error"});
        }
    }
};

module.exports = PostLogin
