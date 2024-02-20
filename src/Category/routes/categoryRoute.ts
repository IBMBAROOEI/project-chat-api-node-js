import express from 'express';
import { CategoryController } from '../controller/categorycontroller';
const router = express.Router();
const categoryController = new CategoryController();

router.post('/category', categoryController.createcat);
router.get('/category', categoryController.showcat);
router.delete('/category/:id', categoryController.deletecat);
router.put('/category/:id', categoryController.updatecat);
router.get('/category/:id', categoryController.showproductbycat);


export default router;