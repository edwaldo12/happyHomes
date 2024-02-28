import { Sequelize, Dialect } from "sequelize";
import { modelTimesheet } from "../models/modelTimesheet";
import { modelProject } from "../models/modelProject";
import dbConfig from "./connection";
import { DbConnection } from "../interface/dbInterface/dbConnection";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "postgres" as Dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: DbConnection = {
  Sequelize,
  sequelize,
  project: modelProject(sequelize),
  timesheet: modelTimesheet(sequelize),
};

export default db;
