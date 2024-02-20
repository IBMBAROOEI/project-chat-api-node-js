import express from 'express';
import { Productcontroller } from '../controller/productcontroller';
const router = express.Router();
const productController = new Productcontroller();

// Route for creating a product
router.post('/products', productController.creatproduct);
router.get('/products', productController.getproduct);
router.delete('/products/:id', productController.deleteproduct);
router.put('/products/:id', productController.updateproduct);



export default router;