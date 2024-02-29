import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppState } from "../providers/AppContext";
import { ProjectBody } from "../interface/Project/ProjectInterface";
import { getProjects } from "../api/ProjectsApi";

interface ProjectPost {
  id_proyek: ProjectBody[];
}

const NavbarMenu = () => {
  const {
    setShowModal,
    showModal,
    setValueFilter,
    setValuePostFilter,
    renderProject,
  } = useAppState();
  const [open, setOpen] = useState<boolean>(false);
  const [ShowProject, setShowProject] = useState<ProjectBody[]>([]);
  const [projectPost, setProjectPost] = useState<ProjectPost>({
    id_proyek: [],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProjects().then((dataProject) => {
      setShowProject(dataProject.data);
    });
  }, [renderProject]);

  const filterData = () => {
    if (projectPost.id_proyek.length > 0) {
      setValuePostFilter(projectPost.id_proyek.map((el) => el.id).join(","));
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", margin: "0 1rem 0 0" }}>
          <Box
            sx={{
              marginRight: "1rem",
              marginLeft: "0.6rem",
              marginTop: "1rem",
            }}
          >
            <Typography variant="h6">Daftar Kegiatan</Typography>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <Button
              sx={{
                fontSize: "0.75rem",
                backgroundColor: "#ADD8E6",
                color: "blue",
              }}
              variant="contained"
              onClick={() => setShowModal(!showModal)}
            >
              <AddCircleOutlineIcon />
              Tambah Kegiatan
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            marginRight: "1rem",
          }}
        >
          <Box sx={{ "& > :not(style)": { margin: "0.5rem" } }}>
            <FormControl variant="standard">
              <Input
                onChange={(e) => setValueFilter(e.target.value)}
                id="input-with-icon-adornment"
                placeholder="Cari"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ marginRight: "1.5rem", marginTop: "0.7rem" }}>
            <FilterListIcon
              onClick={handleOpen}
              sx={{
                fontSize: "2rem",
                borderColor: "#F15858",
                borderWidth: "1px",
                borderStyle: "solid",
                color: "#F15858",
                borderRadius: "20%",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Filter
        </DialogTitle>
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
          <Typography>Proyek *</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 4 }}>
            <Autocomplete
              multiple
              sx={{
                boxShadow: 1,
                border: "1px solid",
                borderColor: "gray.200",
                borderRadius: "md",
                color: "gray.700",
                "& .MuiAutocomplete-inputRoot": {
                  padding: "0.5rem",
                  lineHeight: "1.5",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)",
                  },
                },
              }}
              disablePortal
              id="id_proyek"
              options={[...ShowProject]}
              getOptionLabel={(option: any) => option.label}
              value={projectPost.id_proyek}
              onChange={(event: any, newValue: any) => {
                setProjectPost({ ...projectPost, id_proyek: newValue });
              }}
              renderInput={(params: any) => (
                <TextField {...params} label="Project" />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: "0.25rem" }}>
          <Button sx={{ color: "#FF420E" }} onClick={handleClose}>
            Hapus Filter
          </Button>
          <Button
            sx={{ backgroundColor: "#FF420E" }}
            variant="contained"
            onClick={filterData}
          >
            Terapkan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavbarMenu;
