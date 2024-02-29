import url from "../utils/url";
import apiAdapter from "../utils/apiAdapter";
import { AxiosResponse } from "axios";
import { ProjectBody } from "../interface/Project/ProjectInterface";

export const addProject = async (body: ProjectBody): Promise<AxiosResponse> => {
  try {
    const apiAddProject = apiAdapter(url);
    const res = await apiAddProject.post(`/api/add-project`, body);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProjects = async (): Promise<AxiosResponse> => {
  try {
    const apiGetProject = apiAdapter(url);
    const res = await apiGetProject.get(`/api/get-projects`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
