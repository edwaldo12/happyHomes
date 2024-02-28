import { Sequelize, Model, DataTypes } from "sequelize";
import { ProjectAttributes, ProjectCreationAttributes } from "../interface/interfaceModel/projectInterface";

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public description!: string;
}

export const modelProject = (sequelize: Sequelize): typeof Project => {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "project",
    }
  );

  return Project;
};
