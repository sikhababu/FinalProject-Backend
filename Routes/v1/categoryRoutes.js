const express = require('express');
const { createCategory, listCategories, deleteCategory } = require('../../Controllers/categoryControllers');
const upload = require('../../Middleware/multer');
const authMiddleware = require('../../Middleware/authMiddleware');
const { isAdmin } = require('../../Middleware/checkRole');


const categoryRoutes = express.Router();

categoryRoutes.post('/create',upload.single('image'), authMiddleware, isAdmin, createCategory);
categoryRoutes.get('/list', listCategories);
categoryRoutes.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory);

module.exports = categoryRoutes;
