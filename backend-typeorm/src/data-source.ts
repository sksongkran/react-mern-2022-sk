import "reflect-metadata";
import { DataSource } from "typeorm";
import { Counters } from "./entity/Counters";
import { Products } from "./entity/Products";
import { Transactions } from "./entity/Transactions";
import { Users } from "./entity/Users";

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "demopos",
  synchronize: true,
  logging: false,
  entities: [Users, Products, Counters, Transactions],
  migrations: [],
  subscribers: [],
});

