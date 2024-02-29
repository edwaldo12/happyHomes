import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppState } from "../providers/AppContext";
import { deleteTimesheet } from "../api/TimesheetsApi";
import { useMutation } from "react-query";

const ConfirmationDialog: React.FC = () => {
  const {
    valueDeleteDialog,
    setValueDeleteDialog,
    setmessageSucceed,
    setShowSuccedModal,
    deleteID,
    setRenderTable,
    renderTable,
  } = useAppState();

  const { mutate, isLoading, isError, error } = useMutation(deleteTimesheet, {
    onSuccess: () => {
      setRenderTable(!renderTable);
      setValueDeleteDialog(false);
      setmessageSucceed("Berhasil Hapus Timesheet");
      setShowSuccedModal(true);
    },
    onError: (error) => {
      console.error("Something's Wrong:", error);
    },
  });

  const handleDelete = () => {
    mutate(deleteID);
  };

  const handleClose = () => {
    setValueDeleteDialog(false);
  };

  return (
    <Dialog
      open={valueDeleteDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Timesheet ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to delete timesheet ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#FF420E" }} onClick={handleClose}>
          Kembali
        </Button>
        <Button
          sx={{ backgroundColor: "#FF420E" }}
          variant="contained"
          onClick={handleDelete}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
