// import { Entity, ObjectIdColumn, Column, CreateDateColumn } from "typeorm";
// import { ObjectId } from "mongodb";
// import { User } from "../../user/entity/User";

// @Entity()
// export class Message {
//   @ObjectIdColumn()
//   _id!: ObjectId;

//   @Column()
//   message!: string;

//   @Column(type=> User)
//   receiverId!: string;

//   @Column(type =>User)
//   senderId!: string;

//   @CreateDateColumn()
//   createdAt!: Date;
// }


import { Entity, ObjectId,ObjectIdColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Message {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  message!: string;

  @Column()
  receiverId!:string|ObjectId;

  @Column()
  senderId!: string|ObjectId;

  @CreateDateColumn()
  createdAt!: Date;
}