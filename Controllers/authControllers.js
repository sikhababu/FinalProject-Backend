const UserModel = require("../Model/userModel")
const bcrypt = require("bcrypt")
const generateToken = require("../Utilities/generateToken")
require('dotenv').config()

// Login

const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;

   
  
      if (!email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const user = await UserModel.findOne({ email, role });
      if (!user) {
        return res.status(400).json({ error: `${role} does not exist` });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: "Password does not match" });
      }
  
      const token = generateToken(user._id, user.role);
      const userObject = user.toObject();
      delete userObject.password;
  
      res.status(200).json({ message: 'Login successful', user: userObject, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Register (optional role input)
  const register = async (req, res) => {
    try {
      const { name, email, password, address, role = "user" } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      if ((role === 'user' || role === 'seller') && (!name || !address)) {
        return res.status(400).json({ error: `${role} requires name and address` });
      }
  
      const existing = await UserModel.findOne({ email, role });
      if (existing) {
        return res.status(400).json({ error: `${role} already exists` });
      }
  
      const hashedPassword = await bcrypt.hash(password.toString(), 10);
      const newUser = new UserModel({ name, email, password: hashedPassword, address, role });
  
      const savedUser = await newUser.save();
      const token = generateToken(savedUser._id, savedUser.role);
  
      const userObject = savedUser.toObject();
      delete userObject.password;
  
      res.status(201).json({ message: `${role} registered`, user: userObject, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, password } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (password) {
      const hashedPassword = await bcrypt.hash(password.toString(), 10);
      user.password = hashedPassword;
    } 

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

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

    login,
    register,
    deleteUser,
    updateUser,
    userProfile


}

