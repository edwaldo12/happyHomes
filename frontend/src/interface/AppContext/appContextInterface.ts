import { ReactNode } from "react";

export interface AppContextType {
  showKegiatan: boolean;
  setShowKegiatan: React.Dispatch<React.SetStateAction<boolean>>;
  showPengaturan: boolean;
  setShowPengaturan: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSuceedModal: boolean;
  setShowSuccedModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  messageSucceed: string;
  setmessageSucceed: React.Dispatch<React.SetStateAction<string>>;
  valueFilter: any; 
  setValueFilter: React.Dispatch<React.SetStateAction<any>>;
  valuePostFilter: any; 
  setValuePostFilter: React.Dispatch<React.SetStateAction<any>>;
  EditID: number;
  setEditID: React.Dispatch<React.SetStateAction<number>>;
  valueNavbar: string;
  setValueNavbar: React.Dispatch<React.SetStateAction<string>>;
  valueDeleteDialog: boolean;
  setValueDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  renderTable: boolean;
  setRenderTable: React.Dispatch<React.SetStateAction<boolean>>;
  renderProject: boolean;
  setRenderProject: React.Dispatch<React.SetStateAction<boolean>>;
  deleteID: number;
  setDeleteID: React.Dispatch<React.SetStateAction<number>>;
  valuePengaturan: {
    name: string;
    rate: number;
  };
  setValuePengaturan: React.Dispatch<
    React.SetStateAction<{
      name: string;
      rate: number;
    }>
  >;
}

export interface IStateProviderProps {
  children: ReactNode;
}

