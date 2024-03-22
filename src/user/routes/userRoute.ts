import express from 'express';
import { Usercontroller } from '../controller/Usercontroller';
import {authenticationtoken} from '../../middleware/authenticationtoken'
import {validateRigister} from '../validate/validate'

const router = express.Router();
const usercontroller = new Usercontroller();


// Route for creating a 
// router.post('/user',validateRigister.validateRigister, usercontroller.registers);
router.post('/user',validateRigister, usercontroller.registers);

router.post('/user/login', validateRigister,usercontroller.login);
router.get('/user/:id',authenticationtoken,usercontroller.profile);



export default router;