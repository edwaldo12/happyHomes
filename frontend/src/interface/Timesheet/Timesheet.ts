import { ProjectBody } from "../Project/ProjectInterface";

export interface TimesheetBody {
  id?: string | number;
  tanggal_mulai: Date;
  tanggal_berakhir: Date;
  description: string;
  proyek_id: {};
}

export interface GetTimesheetsParams {
  data?: string;
  data_1?: string;
}

export interface TimesheetPostData {
  tanggal_mulai?: string;
  tanggal_berakhir?: string;
  description?: string;
  nama_proyek?: ProjectBody;
}
