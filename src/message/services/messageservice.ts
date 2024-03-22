import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Message } from '../entity/Message';
import { Server, Socket } from 'socket.io';
import { User } from '../../user/entity/User';



export class MessageService {
 
  io: Server;
  constructor(io: Server) {
    this.io = io;
  }

 public async sendMessage(receiverId: string, senderId: string, message: string): Promise<Message> {
  const newMessage = AppDataSource.getMongoRepository(Message).create({
    message: message,
    senderId: senderId,
    receiverId: receiverId,
  });

   this.io.emit("new_message",newMessage);
  return AppDataSource.getMongoRepository(Message).save(newMessage);
}




  public async finduser(id: string): Promise<User | null> {


    const user = await AppDataSource.getMongoRepository(User).findOne
      ({
        where: { _id: new ObjectId(id) },
        select: ['_id', 'email']

      });

    return user;
  }




  public async showuser(): Promise<any> {

    const users = await AppDataSource.getMongoRepository(User).find({
      select: ['_id', 'email'],
    });
    return users;
  }


 
 

  public async getChat(userId: string,selectedUserId:string): Promise<Message[]> {
    // ...
    
    const userChats = await AppDataSource.getMongoRepository(Message).find({
        where: {
          $or: [
            { senderId: userId, receiverId: selectedUserId },
            { senderId: selectedUserId, receiverId: userId }
          ]
    }
    
    });
    return userChats;

  }

  }

