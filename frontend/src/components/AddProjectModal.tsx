import React, { useState } from "react";
import { useMutation } from "react-query";
import { addProject } from "../api/ProjectsApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppState } from "../providers/AppContext";
import { useForm } from "react-hook-form";
import { ProjectPost } from "../interface/Project/ProjectInterface";

const AddProjectModal: React.FC = () => {
  const [ProjectPost, setProjectPost] = useState<ProjectPost>({
    nama_proyek: "",
  });
  const {
    setmessageSucceed,
    setShowSuccedModal,
    showProjectModal,
    setShowProjectModal,
    renderProject,
    setRenderProject,
  } = useAppState();

  const { mutate, isLoading, isError, error } = useMutation(addProject, {
    onSuccess: () => {
      setShowProjectModal(!showProjectModal);
      setRenderProject(!renderProject);
      setProjectPost({ nama_proyek: "" });
      setShowSuccedModal(true);
      setmessageSucceed("Tambah Proyek Baru Berhasil");
    },
    onError: (error) => {
      console.error("Something's Wrong:", error);
    },
  });

  const handleClose = () => {
    setShowProjectModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectPost>({ defaultValues: ProjectPost });

  const onSubmit = (data: ProjectPost) => {
    const objProject = {
      description: data.nama_proyek,
    };
    mutate(objProject);
    reset();
  };

  const formData = {
    nama_proyek: register("nama_proyek", {
      required: "Nama Proyek field is required.",
    }),
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showProjectModal}
        fullWidth={true}
        maxWidth="xs"
      >
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2 }}>Tambah Proyek Baru</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box>
              <Typography sx={{ paddingRight: 2 }}>Nama Proyek *</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextField
                  {...formData.nama_proyek}
                  variant="outlined"
                  fullWidth
                  label="Nama Proyek"
                  error={!!errors.nama_proyek}
                  helperText={errors.nama_proyek?.message}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mb: "0.25rem" }}>
            <Button sx={{ color: "#FF420E" }} onClick={handleClose}>
              Kembali
            </Button>
            <Button
              sx={{ backgroundColor: "#FF420E" }}
              variant="contained"
              type="submit"
            >
              {isLoading ? "Saving..." : "Simpan"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
export default AddProjectModal;
