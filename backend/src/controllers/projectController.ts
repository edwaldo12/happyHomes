import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import Error500Server from "../middleware/error/Error500";
import Error401ClientWrong from "../middleware/error/Error401";
import { ProjectData } from "../interface/projectController/projectControllerInterface";

const Project = db.project;

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: ProjectData[] = await Project.findAll();
    const responseData = data.map((el) => ({
      id: el.id,
      label: el.description,
    }));

    res.status(200).json({
      Status: 200,
      data: responseData,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const description = req.query.description as string;
    const data: ProjectData | null = await Project.findOne({
      where: { description },
    });

    res.status(200).json({
      Status: 200,
      data,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description } = req.body;
    if (!description) {
      throw new Error401ClientWrong("Description is required");
    }

    const project = {
      description,
    };

    const newProject: ProjectData = await Project.create(project);
    const allProjectsAfterSave: ProjectData[] = await Project.findAll();

    res.status(201).json({
      Status: 201,
      newProject,
      allProjectsAfterSave,
    });
  } catch (err) {
    next(new Error500Server(err instanceof Error ? err.message : String(err)));
  }
};

export { getProjects, addProject, getProject };
