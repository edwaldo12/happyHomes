export interface TimesheetRequestBody {
  tanggal_mulai?: Date;
  tanggal_berakhir?: Date;
  description: string;
  nama_proyek: {
    id: number;
  };
}

export interface TimesheetQueryParams {
  data?: string;
  data_1?: string;
}

export interface TimesheetAttributes {
  id: number;
  tanggal_mulai?: Date;
  tanggal_berakhir?: Date;
  description: string;
  proyek_id: number;
}
