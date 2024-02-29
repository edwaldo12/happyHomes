import url from "../utils/url";
import apiAdapter from "../utils/apiAdapter";
import { AxiosResponse } from "axios";
import {
  TimesheetBody,
  TimesheetPostData,
} from "../interface/Timesheet/Timesheet";

export const postTimesheet = async (body: TimesheetPostData): Promise<void> => {
  try {
    const apiAddTimesheet = apiAdapter(url);
    await apiAddTimesheet.post(`${url}/api/add-timesheet`, body);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteTimesheet = async (id: string | number): Promise<void> => {
  try {
    const apiDeleteTimesheet = apiAdapter(url);
    await apiDeleteTimesheet.delete(`/api/delete-timesheet/${id}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTimesheet = async (id: string | number): Promise<any> => {
  try {
    const apiGetTimesheet = apiAdapter(url);
    const res: AxiosResponse = await apiGetTimesheet.get(
      `/api/get-timesheet/${id}`
    );
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTimesheets = async (
  data: string,
  data_1: string
): Promise<any> => {
  try {
    const apiGetTimesheets = apiAdapter(url);
    const res: AxiosResponse = await apiGetTimesheets.get(
      `/api/get-timesheets?data=${data || ""}&data_1=${data_1 || ""}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateTimesheet = async (body: TimesheetBody): Promise<void> => {
  try {
    if (body.id === undefined) {
      throw new Error("The timesheet ID is undefined.");
    }
    const getTimesheetRes = await getTimesheet(body.id);
    if (getTimesheetRes) {
      const apiUpdateTimesheet = apiAdapter(url);
      await apiUpdateTimesheet.put(
        `${url}/api/update-timesheet/${getTimesheetRes.id}`,
        body
      );
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
