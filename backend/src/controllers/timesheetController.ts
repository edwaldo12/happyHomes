import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import db from "../config/db";
import Error500Server from "../middleware/error/Error500";
import Error401ClientWrong from "../middleware/error/Error401";
import Error404NotFound from "../middleware/error/Error404";
import {
  TimesheetQueryParams,
  TimesheetRequestBody,
} from "../interface/timesheetController/timesheetControllerInterface";
import { TimesheetAttributes } from "../interface/timesheetModel/timesheetModelInterface";

const Project = db.project;
const Timesheet = db.timesheet;

const addTimesheet = async (
  req: Request<{}, {}, TimesheetRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { tanggal_mulai, tanggal_berakhir, description, nama_proyek } =
    req.body;

  if (!tanggal_mulai || !description || !nama_proyek.id) {
    return next(
      new Error401ClientWrong(
        "Validation Error: Tanggal Mulai, Description, and Nama Proyek ID are required."
      )
    );
  }

  try {
    const newTimesheet = await Timesheet.create({
      tanggal_mulai,
      tanggal_berakhir,
      description,
      proyek_id: nama_proyek.id,
    });

    const allTimesheetsAfterSave = await Timesheet.findAll();

    res.status(201).json({
      Status: 201,
      newTimesheet,
      allTimesheetsAfterSave,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const getTimesheets = async (
  req: Request<{}, {}, {}, TimesheetQueryParams>,
  res: Response,
  next: NextFunction
) => {
  let condition: any = {};

  if (req.query.data) {
    condition.description = { [Op.like]: `%${req.query.data}%` };
  }

  if (req.query.data_1) {
    condition[Op.or] = req.query.data_1
      .split(",")
      .map((el) => ({ proyek_id: { [Op.eq]: parseInt(el) } }));
  }

  try {
    const timesheets = await Timesheet.findAll({
      where: condition,
      include: [Project],
      raw: true,
    });

    const responseData = timesheets.map((el) => ({
      ...el,
      total_durasi: el.tanggal_berakhir
        ? new Date(el.tanggal_berakhir).getTime() -
          new Date(el.tanggal_mulai).getTime()
        : null,
    }));

    res.status(200).json({
      Status: 200,
      data: responseData,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const getTimesheet = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const timesheet = await Timesheet.findByPk(id, { include: [Project] });

    if (timesheet) {
      res.status(200).json({
        Status: 200,
        data: timesheet,
      });
    } else {
      next(new Error404NotFound(`Cannot find Timesheet with id=${id}.`));
    }
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const updateTimesheet = async (
  req: Request<{ id: string }, {}, TimesheetAttributes>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { tanggal_mulai, proyek_id } = req.body;
  if (!tanggal_mulai || !proyek_id) {
    return next(
      new Error401ClientWrong(
        "Validation error: Tanggal Mulai and Proyek ID are required."
      )
    );
  }

  try {
    const [updated] = await Timesheet.update(req.body, {
      where: { id: parseInt(id) },
    });

    if (updated) {
      const updatedTimesheet = await Timesheet.findByPk(parseInt(id));
      const allUpdatedTimesheets = await Timesheet.findAll();
      res.status(200).json({
        Status: 200,
        updatedTimesheet,
        allUpdatedTimesheets,
      });
    } else {
      next(
        new Error404NotFound(
          `Cannot update Timesheet with id=${id}. Maybe Timesheet was not found or req.body is empty!`
        )
      );
    }
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const deleteTimesheet = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);

  try {
    const timesheet = await Timesheet.findByPk(id);

    if (!timesheet) {
      return next(new Error404NotFound(`Cannot find Timesheet with id=${id}.`));
    }

    await Timesheet.destroy({
      where: { id: id },
    });

    res.status(200).json({
      message: "Timesheet was deleted successfully!",
      deletedTimesheet: timesheet,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

export {
  addTimesheet,
  getTimesheets,
  getTimesheet,
  updateTimesheet,
  deleteTimesheet,
};
