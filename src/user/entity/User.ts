import { Entity, ObjectId,ObjectIdColumn, Column ,CreateDateColumn} from "typeorm"


@Entity()
export class User {

    @ObjectIdColumn()
    _id!: ObjectId


    @Column()
    email!: string

    @Column()
    password!:string

    @CreateDateColumn()
    createdAt!:Date;
  static findById: any;
  static findOne: any;
  

    


   
 

}