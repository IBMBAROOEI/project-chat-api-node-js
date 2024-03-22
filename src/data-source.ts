import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./user/entity/User";
import { Message } from "./message/entity/Message";


export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,

  database: "mychat",
  synchronize: true,
  logging: true,
  entities: [User,Message],
  subscribers: [],
  // migrations: [
  //   "src/migrations/**/*.ts"
  // ]
});



