import express from 'express';
import { TagController } from '../controller/Tagcontroller';
const router = express.Router();
const tagController = new TagController();

router.post('/tag', tagController.createtag);
router.get('/tag', tagController.showtag);
router.get('/tag/:id', tagController.showproductbytag);
router.delete('/tag/:id', tagController.deletetag);
router.put('/tag/:id', tagController.updatetag);
export default router;