const CategoryModel = require("../Model/categoryModel");
const uploadToCloudinary = require("../Utilities/imageUpload");


const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "All fields are required!!" });
  }

    if (!req.file) {
                return res.status(400).json({ error: 'Image not found' });
            }
    
    const cloudinaryRes = await uploadToCloudinary(req.file.path);
    

    const newCategory = new CategoryModel({ name,
      image: cloudinaryRes
     });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
    createCategory,
    listCategories,
    deleteCategory
}