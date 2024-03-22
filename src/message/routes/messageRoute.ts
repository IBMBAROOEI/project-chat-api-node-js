import express from 'express';
import { Messagecontroller } from '../controller/Messagecontroller';
import { authenticationtoken } from '../../middleware/authenticationtoken';
const router = express.Router();
const messagecontroller = new Messagecontroller();



router.post('/sendmessage',authenticationtoken,messagecontroller.sendmessage);
router.get('/datauser',authenticationtoken, messagecontroller.showusers);
router.get('/finduser/:id',authenticationtoken, messagecontroller.finduser);
router.get('/getchat/:userId/:selectedUserId',authenticationtoken,messagecontroller.getchat);
export default router;