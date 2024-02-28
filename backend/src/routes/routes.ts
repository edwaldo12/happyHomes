import Router from "express";
import {
  getTimesheets,
  getTimesheet,
  addTimesheet,
  updateTimesheet,
  deleteTimesheet,
} from "../controllers/timesheetController";

import {
  addProject,
  getProjects,
  getProject,
} from "../controllers/projectController";
import { errorHandler } from "../middleware/errorHandler";
import errorNotFound from "../middleware/errorNotFound";

const router = Router();

//Timesheet Routes
router.get("/api/get-timesheets", getTimesheets);
router.get("/api/get-timesheet/:id", getTimesheet);
router.post("/api/add-timesheet", addTimesheet);
router.put("/api/update-timesheet/:id", updateTimesheet);
router.delete("/api/delete-timesheet/:id", deleteTimesheet);

//Project Routes
router.post("/api/add-project", addProject);
router.get("/api/get-projects", getProjects);
router.get("/api/get-project", getProject);
router.use(errorNotFound);
router.use(errorHandler);

export default router;
