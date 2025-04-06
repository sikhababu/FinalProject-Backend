const UserModel = require("../Model/userModel")
const bcrypt = require("bcrypt")
const generateToken = require("../Utilities/generateToken")
require('dotenv').config()


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const existUser = await UserModel.findOne({ email })

        if (!existUser) {

            return res.status(400).json({ error: "user does not exist" })
        }

        const passwordMatch = await bcrypt.compare(password, existUser.password)

        if (!passwordMatch) {

            return res.status(400).json({ error: "Password does not match" })
        }

        //Token generation 

        const token = generateToken(existUser._id)
       // res.cookie("token", token)
       res.cookie("userToken", token)

       const userObject = existUser.toObject()
       delete userObject.password

        res.status(200).json({ message: 'Login Successfull', userObject, token })
    }
    catch (error) {

        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}


const register = async (req, res) => {
    try {

        const { name, email, password, address } = req.body
        if (!name || !email || !password || !address) {

            return res.status(400).json({ error: "All fields are required" })
        }

        const salt = await bcrypt.genSalt(10)
        const passwordToString = password.toString()
        const hashedPassword = await bcrypt.hash(passwordToString, salt)

        const newUser = new UserModel({ name, email, password: hashedPassword,address })

        const saved = await newUser.save()

        //token generation
        const token = generateToken(saved._id)
        //res.cookie("token", token)
        res.cookie("userToken", token)

        
       const userObject = saved.toObject()
       delete userObject.password

        res.status(201).json({ message: 'User Created', userObject })

    }
    catch (error) {
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }

}

const deleteUser = async (req,res)=> {
try{
    const {userid} = req.params
    const deletedUser = await UserModel.findByIdAndDelete(userid)

    const userObject = deletedUser.toObject()
    delete userObject.password

    res.status(200).json({message : 'user deleted', userObject})
}
catch (error){

    res.status(error.status||500).json({error : error.message || "internal server error"})
}
    
}

const updateUser = async (req,res)=> {
try {
   
    const {id} = req.params
   const updatedUser = await UserModel.findByIdAndUpdate(id,req.body,{new:true})
   
   const userObject = updatedUser.toObject()
   delete userObject.password

    res.status(200).json({message : 'user updated', userObject})
}
catch (error){

    res.status(error.status||500).json({error : error.message || "internal server error"})
}

}

const userProfile = async (req,res)=> {
    try{

        const {id} = req.params
        
     const userDetails = await UserModel.findById(id)

     const userObject = userDetails.toObject()
     delete userObject.password
        res.status(200).json({message : 'user searched', userObject})
    }
    catch (error){

        res.status(error.status||500).json({error : error.message || "internal server error"})
    }
   
}


module.exports = {

    loginUser,
    register,
    deleteUser,
    updateUser,
    userProfile


}

