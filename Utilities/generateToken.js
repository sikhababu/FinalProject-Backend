const jwt = require("jsonwebtoken");

const generateToken = (id, role='user')=> {
    try {
        const token = jwt.sign({id:id, role: role},process.env.JWT_SECRETE)
        return token
        
    } catch (error) {
        console
    }



}

module.exports = generateToken