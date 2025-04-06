const bcrypt = require("bcrypt")
const generateToken = require("../Utilities/generateToken")
const AdminModel = require("../Model/adminModel")
require('dotenv').config()


const register = async (req, res) => {
    try {

        const { email, password } = req.body
        if ( !email || !password) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const existadmin = await AdminModel.findOne({ email })
        
                if (existadmin) {
        
                    return res.status(400).json({ error: "admin already exists" })
                }

        const salt = await bcrypt.genSalt(10)
        const passwordToString = password.toString()
        const hashedPassword = await bcrypt.hash(passwordToString, salt)

        const newAdmin = new AdminModel({  email, password: hashedPassword})

        const saved = await newAdmin.save()

        //token generation
        //const token = generateToken(saved._id)
        //res.cookie("token", token)
        //res.cookie("user-token", token)

        
       const adminObject = saved.toObject()
       delete adminObject.password

        res.status(201).json({ message: 'Admin Created', adminObject })

    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }



}


const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const existAdmin = await AdminModel.findOne({ email })

        if (!existAdmin) {

            return res.status(400).json({ error: "admin does not exist" })
        }

        const passwordMatch = await bcrypt.compare(password, existAdmin.password)

        if (!passwordMatch) {

            return res.status(400).json({ error: "Password does not match" })
        }

        //Token generation 

        const token = generateToken(existAdmin._id)
        res.cookie("AdminToken", token)
       // res.cookie("user-token", token)

       const adminObject = existAdmin.toObject()
       delete adminObject.password

        res.status(200).json({ message: 'Login Successfull', adminObject, token })
    }
    catch (error) {

        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}

const logoutAdmin = async (req, res) => {
try {

    res.clearCookie("AdminToken")
    res.status(200).json({ message: 'Logout Successfull'})
    
} catch (error) {
    res.status(error.status || 500).json({ error: error.message || "internal server error" })
}
}

module.exports = {


    register,
    loginAdmin,
    logoutAdmin

}

