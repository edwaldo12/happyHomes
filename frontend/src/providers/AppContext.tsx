import { useState, createContext, useContext, FunctionComponent } from "react";
import {
  AppContextType,
  IStateProviderProps,
} from "../interface/AppContext/appContextInterface";

const AppContext = createContext<AppContextType | undefined>(undefined);

const StateProvider: FunctionComponent<IStateProviderProps> = ({
  children,
}) => {
  const [showKegiatan, setShowKegiatan] = useState(true);
  const [showPengaturan, setShowPengaturan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuceedModal, setShowSuccedModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [messageSucceed, setmessageSucceed] = useState("");
  const [valueFilter, setValueFilter] = useState(null);
  const [valuePostFilter, setValuePostFilter] = useState();
  const [EditID, setEditID] = useState(0);
  const [valueNavbar, setValueNavbar] = useState("1");
  const [valueDeleteDialog, setValueDeleteDialog] = useState(false);
  const [renderTable, setRenderTable] = useState(false);
  const [renderProject, setRenderProject] = useState(false);
  const [deleteID, setDeleteID] = useState(0);
  const [valuePengaturan, setValuePengaturan] = useState({
    name: "Happy Homes",
    rate: 10000,
  });

  const contextValue: AppContextType = {
    showKegiatan,
    setShowKegiatan,
    showPengaturan,
    setShowPengaturan,
    showModal,
    setShowModal,
    showSuceedModal,
    setShowSuccedModal,
    showEditModal,
    setShowEditModal,
    showProjectModal,
    setShowProjectModal,
    messageSucceed,
    setmessageSucceed,
    valueFilter,
    setValueFilter,
    valuePostFilter,
    setValuePostFilter,
    EditID,
    setEditID,
    valueNavbar,
    setValueNavbar,
    valueDeleteDialog,
    setValueDeleteDialog,
    renderTable,
    setRenderTable,
    renderProject,
    setRenderProject,
    deleteID,
    setDeleteID,
    valuePengaturan,
    setValuePengaturan,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppState = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within the StateProvider");
  }
  return context;
};

export default StateProvider;
