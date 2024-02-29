import { useEffect, useState, FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { useAppState } from "../providers/AppContext";
import { postTimesheet } from "../api/TimesheetsApi";
import { getProjects } from "../api/ProjectsApi";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const AddModal: FC = () => {
  const {
    setmessageSucceed,
    setShowSuccedModal,
    showModal,
    setShowModal,
    setShowProjectModal,
    renderTable,
    setRenderTable,
    renderProject,
    setRenderProject,
  } = useAppState();

  const [ShowProject, setShowProject] = useState([]);
  const [timesheetPost] = useState({
    tanggal_mulai: dayjs(),
    tanggal_berakhir: dayjs(),
    jam_mulai: dayjs(),
    jam_berakhir: dayjs(),
    description: "",
    nama_proyek: { id: 0, label: "" },
  });

  useEffect(() => {
    getProjects().then((projects) => {
      setShowProject(projects.data);
    });
  }, [renderProject]);

  const handleClose = () => setShowModal(false);

  const { mutate, isLoading, isError, error } = useMutation(postTimesheet, {
    onSuccess: () => {
      setRenderProject(!renderProject);
      setRenderTable(!renderTable);
      setShowSuccedModal(true);
      setmessageSucceed("Berhasil Tambah Timesheet");
      handleClose();
    },
    onError: (error) => {
      console.error("Something's Wrong:", error);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: timesheetPost });

  const onSubmit = (data: any) => {
    const objTimesheet = {
      tanggal_mulai: data.tanggal_mulai.format(),
      tanggal_berakhir: data.tanggal_berakhir.format(),
      description: data.description,
      nama_proyek: data.nama_proyek,
    };
    mutate(objTimesheet);
    reset();
  };

  const formData = {
    description: register("description", {
      required: "Judul Kegiatan field is required.",
    }),
  };

  return (
    <>
      {showModal ? (
        <>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={showModal}
            fullWidth={true}
            maxWidth="md"
          >
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle sx={{ m: 0, p: 2 }}>
                Tambah Kegiatan Baru
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
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-between ",
                  }}
                >
                  <Box sx={{ display: "flex", marginBottom: "1rem" }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <Typography>Tanggal Mulai *</Typography>
                      <Controller
                        name="tanggal_mulai"
                        control={control}
                        rules={{ required: "Tanggal Mulai is required." }}
                        render={({ field, fieldState: { error } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                {...(field as any)}
                                value={field.value || null}
                                renderInput={(params: any) => (
                                  <TextField
                                    {...params}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    label="Tanggal Mulai"
                                  />
                                )}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
                      {errors.tanggal_mulai ? (
                        <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                          {errors.tanggal_mulai.message}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box sx={{ marginRight: "1rem" }}>
                      <Typography>Tanggal Berakhir *</Typography>
                      <Controller
                        name="tanggal_berakhir"
                        control={control}
                        rules={{ required: "Tanggal Berakhir is required." }}
                        render={({ field, fieldState: { error } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                {...(field as any)}
                                value={field.value || null}
                                renderInput={(params: any) => (
                                  <TextField
                                    {...params}
                                    error={!!error}
                                    helperText={error ? error.message : ""}
                                    label="Tanggal Berakhir"
                                  />
                                )}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
                      {errors.tanggal_berakhir ? (
                        <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                          {errors.tanggal_berakhir.message}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box sx={{ marginRight: "1rem" }}>
                      <Typography>Waktu Mulai *</Typography>
                      <Controller
                        name="jam_mulai"
                        control={control}
                        rules={{ required: "Waktu Mulai is required." }}
                        render={({ field, fieldState: { error } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                              <TimePicker
                                {...(field as any)}
                                renderInput={(params: any) => ({ ...params })}
                                onChange={(newTime: any) => {
                                  field.onChange(newTime);
                                  const currentDate =
                                    getValues("tanggal_mulai");
                                  const updatedDateTime = currentDate
                                    ? dayjs(currentDate)
                                        .hour(dayjs(newTime).hour())
                                        .minute(dayjs(newTime).minute())
                                    : newTime;
                                  setValue("tanggal_mulai", updatedDateTime, {
                                    shouldValidate: true,
                                  });
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
                      {errors.jam_mulai ? (
                        <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                          {errors.jam_mulai.message}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box>
                      <Typography>Waktu Berakhir *</Typography>
                      <Controller
                        name="jam_berakhir"
                        control={control}
                        rules={{ required: "Waktu Berakhir is required." }}
                        render={({ field, fieldState: { error } }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["TimePicker"]}>
                              <TimePicker
                                {...(field as any)}
                                renderInput={(params: any) => ({ ...params })}
                                onChange={(newTime: any) => {
                                  field.onChange(newTime);
                                  const currentDate =
                                    getValues("tanggal_berakhir");
                                  const updatedDateTime: any = currentDate
                                    ? dayjs(currentDate)
                                        .hour(dayjs(newTime).hour())
                                        .minute(dayjs(newTime).minute())
                                    : newTime;
                                  setValue(
                                    "tanggal_berakhir",
                                    updatedDateTime,
                                    {
                                      shouldValidate: true,
                                    }
                                  );
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        )}
                      />
                      {errors.jam_berakhir ? (
                        <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                          {errors.jam_berakhir.message}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ paddingRight: 2 }}>
                    Judul Kegiatan *
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      {...formData.description}
                      variant="outlined"
                      fullWidth
                      label="Judul Kegiatan"
                      error={!!errors.description}
                      helperText={
                        errors.description ? errors.description.message : ""
                      }
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography sx={{ paddingRight: 2 }}>Proyek *</Typography>
                  <Controller
                    name="nama_proyek"
                    control={control}
                    rules={{ required: "Proyek is required." }}
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        {...field}
                        options={[{ id: 0, label: "Tombol" }, ...ShowProject]}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        onChange={(_, data) => field.onChange(data)}
                        renderOption={(props, option) => {
                          if (option.id) {
                            return (
                              <Box component={MenuItem} {...props}>
                                {option.label}
                              </Box>
                            );
                          } else if (option.id === 0) {
                            return (
                              <Box
                                component={Button as any}
                                {...props}
                                onClick={() => setShowProjectModal(true)}
                              >
                                + Tambah Proyek
                              </Box>
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Project"
                            error={!!error}
                            helperText={error ? error.message : ""}
                          />
                        )}
                      />
                    )}
                  />
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
                  {isLoading ? "Loading..." : "Simpan"}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      ) : null}
    </>
  );
};
export default AddModal;
