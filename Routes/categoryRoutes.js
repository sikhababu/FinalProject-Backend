const express = require('express');
const { createCategory, listCategories, deleteCategory } = require('../Controllers/categoryControllers');
const upload = require('../Middleware/multer');


const categoryRoutes = express.Router();

categoryRoutes.post('/create',upload.single('image'), createCategory);
categoryRoutes.get('/list', listCategories);
categoryRoutes.delete('/delete/:id', deleteCategory);

module.exports = categoryRoutes;
