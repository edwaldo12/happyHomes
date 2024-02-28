import { Sequelize } from "sequelize";
import { Timesheet } from "../../models/modelTimesheet";
import { Project } from "../../models/modelProject";

export interface DbConnection {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  timesheet: typeof Timesheet;
  project: typeof Project;
}

export interface ConfigDb {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
