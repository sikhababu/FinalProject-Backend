const jwt = require('jsonwebtoken')

const userModel = require('../Model/userModel')

const authUser = (req, res, next) => {
    try {

        const {userToken}= req.cookies

        if (!userToken) {

            return res.status(401).json({ message: "user not authorized" })
        }

        const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRETE)

        

        if (!verifiedToken){
            return res.status(401).json({ message: "user not authorized" })

        }
        req.user = verifiedToken

    
        next()
    } catch (error) {

        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }


}

module.exports = authUser