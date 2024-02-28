export interface TimesheetAttributes {
  id: number;
  description: string;
  tanggal_mulai: Date;
  tanggal_berakhir: Date;
  proyek_id: {
    id: number;
  };
}

export interface TimesheetCreationAttributes {
  description: string;
  tanggal_mulai?: Date | null;
  tanggal_berakhir?: Date | null;
  proyek_id: number;
}
