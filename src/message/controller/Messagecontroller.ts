import { Request, Response } from 'express';
import { MessageService } from '../services/messageservice';
import { UserService } from '../../user/services/userservice';
import { User } from '../../user/entity/User';
const io = require('socket.io')();

const messageservice = new MessageService(io);

const userservice = new UserService();

export class Messagecontroller {


  async sendmessage(req: Request, res: Response) {

    const { senderId, receiverId, message } = req.body;

    try {

      const chat = await messageservice.sendMessage(receiverId, senderId, message);
      // return res.json(chat);
      res.status(201).json({ success: true, data: chat })

    } catch (error) {
      console.log(error)
    }
  }


  async showusers(req: Request, res: Response) {
    try {
      const users = await messageservice.showuser();

      res.json({
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  }



  public async finduser(req: Request, res: Response): Promise<void> {


    try {
      const user = await messageservice.finduser(req.params.id);
      
        res.status(200).json({ success: true, data: user })
    
    } catch (error) {
      console.log(error);
      res.status(500).send({ success:false, message: " failed" });

    }
  }


  public async getchat(req: Request, res: Response): Promise<void> {

    try {

      const chat = await messageservice.getChat(req.params.userId,req.params.selectedUserId);

      res.status(200).json({ success: true, data: chat, })
    
    } catch (error) {

      console.log(error)
      
      res.status(500).send({success:false, message: " failed" });


    }


  }



}

