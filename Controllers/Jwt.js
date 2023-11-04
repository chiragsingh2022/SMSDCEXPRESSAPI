
const jwt = require('jsonwebtoken');
const jwtKey = 'key-highland'

const validateToken = (req, res, next) => {
    let token = req.headers['authorization']; // Use 'Authorization' with a capital 'A'
    //console.log(token);
    if (token) {
        // Split at the space character (' ')
        const tokenParts = token.split(' ');

        // Check if the token has the correct format (Bearer)
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            const tokenValue = tokenParts[1];
            
            jwt.verify(tokenValue, jwtKey, (err, validate) => {
                if (err) {
                    res.status(401).send({ result: "/login" });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send({ result: "Invalid token format" });
        }
    } else {
        res.status(403).send({ result: "/login" });
    }
}



// const validateToken = (req, res, next) => {
//     let token = req.headers['authorization'];
//     //console.log(token);
//     if (token) {
//         token = token.split(' ')[0];
//         //console.log(token);
//         jwt.verify(token, jwtKey, (err, validate) => {
//             if (err) {
//                 res.status(401).send({ result: "You are not authorized" })
//             } else {
//                 next();
//             }
//         })
//     } else {
//         res.status(403).send({ result: "You are not authorized" })
//     }
// }

module.exports = {
jwt,
jwtKey,
validateToken,
};