import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./product/entity/Product";
import { Tag } from "./tag/entity/Tag";
import { Category } from "./Category/entity/Category";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "marziye",
  password: "123",
  database: "m",
  synchronize: true,
  logging: true,
  entities: [Product,Tag,Category],
  subscribers: [],
  migrations: [
    "src/migrations/**/*.ts"
  ]
});



