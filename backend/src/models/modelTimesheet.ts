import { Sequelize, Model, DataTypes } from "sequelize";
import { modelProject } from "./modelProject";
import {
  TimesheetAttributes,
  TimesheetCreationAttributes,
} from "../interface/timesheetModel/timesheetModelInterface";

export class Timesheet
  extends Model<TimesheetAttributes, TimesheetCreationAttributes>
  implements TimesheetAttributes
{
  public id!: number;
  public description!: string;
  public tanggal_mulai!: Date;
  public tanggal_berakhir!: Date;
  public proyek_id!: {
    id: number;
  };
}

const modelTimesheet = (sequelize: Sequelize): typeof Timesheet => {
  Timesheet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      tanggal_mulai: {
        type: DataTypes.DATE,
      },
      tanggal_berakhir: {
        type: DataTypes.DATE,
      },
      proyek_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "timesheet",
    }
  );

  const ProjectModel = modelProject(sequelize);
  Timesheet.belongsTo(ProjectModel, { foreignKey: "proyek_id" });
  return Timesheet;
};

export { modelTimesheet };
