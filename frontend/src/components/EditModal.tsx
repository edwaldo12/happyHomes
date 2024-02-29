import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { useAppState } from "../providers/AppContext";
import { updateTimesheet, getTimesheet } from "../api/TimesheetsApi";
import { getProjects } from "../api/ProjectsApi";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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

const EditModal: React.FC = () => {
  const {
    setShowSuccedModal,
    setmessageSucceed,
    showEditModal,
    setShowEditModal,
    EditID,
    renderTable,
    setRenderTable,
  } = useAppState();
  const [ShowProject, setShowProject] = useState([]);
  const [TimesheetData, setTimesheetData] = useState({
    tanggal_mulai: dayjs(),
    tanggal_berakhir: dayjs(),
    jam_mulai: dayjs(),
    jam_berakhir: dayjs(),
    description: "",
    proyek_id: { id: 0, label: "" },
  });
  useEffect(() => {
    if (EditID) {
      const timesheetFetched = getTimesheet(EditID);
      timesheetFetched
        .then((timesheet) => {
          setValue("tanggal_mulai", dayjs(timesheet.tanggal_mulai));
          setValue("tanggal_berakhir", dayjs(timesheet.tanggal_berakhir));
          setValue("jam_mulai", dayjs(timesheet.tanggal_mulai));
          setValue("jam_berakhir", dayjs(timesheet.tanggal_berakhir));
          setValue("description", timesheet.description);
          setValue("proyek_id", {
            id: timesheet.project.id,
            label: timesheet.project.description,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      getProjects().then((projects) => {
        setShowProject(projects.data);
      });
    }
  }, [showEditModal]);
  const handleClose = () => setShowEditModal(false);

  const { mutate, isLoading, isError, error } = useMutation(updateTimesheet, {
    onSuccess: () => {
      setmessageSucceed("Berhasil Edit Timesheet");
      setShowSuccedModal(true);
      setShowEditModal(false);
      setRenderTable(!renderTable);
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
  } = useForm({ defaultValues: TimesheetData });

  const formData = {
    description: register("description", {
      required: "Judul Kegiatan field is required.",
    }),
  };

  const onSubmit = (data: any) => {
    const objTimesheet = {
      tanggal_mulai: data.tanggal_mulai.format(),
      tanggal_berakhir: data.tanggal_berakhir.format(),
      description: data.description,
      proyek_id: data.proyek_id.id,
    };
    mutate({ id: EditID, ...objTimesheet });
    reset();
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showEditModal}
        fullWidth={true}
        maxWidth="md"
      >
        <form method="PUT" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2 }}>Ubah Kegiatan</DialogTitle>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="tanggal_mulai"
                      control={control}
                      render={({ field }) => (
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            {...(field as any)}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                            value={field.value || null}
                          />
                        </DemoContainer>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ marginRight: "1rem" }}>
                  <Typography>Tanggal Berakhir *</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="tanggal_berakhir"
                      control={control}
                      render={({ field }) => (
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            {...(field as any)}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                            value={field.value || null}
                          />
                        </DemoContainer>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ marginRight: "1rem" }}>
                  <Typography>Waktu Mulai *</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="jam_mulai"
                      control={control}
                      render={({ field }) => (
                        <DemoContainer components={["TimePicker"]}>
                          <TimePicker
                            {...(field as any)}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                            value={field.value || null}
                            onChange={(newTime: any) => {
                              field.onChange(newTime);
                              const currentDate = getValues("tanggal_mulai");
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
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <Typography>Waktu Berakhir *</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="jam_berakhir"
                      control={control}
                      render={({ field }) => (
                        <DemoContainer components={["TimePicker"]}>
                          <TimePicker
                            {...(field as any)}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                            value={field.value || null}
                            onChange={(newTime: any) => {
                              field.onChange(newTime);
                              const currentDate = getValues("tanggal_berakhir");
                              const updatedDateTime: any = currentDate
                                ? dayjs(currentDate)
                                    .hour(dayjs(newTime).hour())
                                    .minute(dayjs(newTime).minute())
                                : newTime;
                              setValue("tanggal_berakhir", updatedDateTime, {
                                shouldValidate: true,
                              });
                            }}
                          />
                        </DemoContainer>
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ paddingRight: 2 }}>Judul Kegiatan *</Typography>
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
                  helperText={errors.description?.message}
                />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ paddingRight: 2 }}>Proyek *</Typography>
              <Controller
                name="proyek_id"
                control={control}
                rules={{ required: "Proyek is required." }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={ShowProject}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Project"
                        error={!!error}
                        helperText={error ? error.message : ""}
                      />
                    )}
                    sx={{ width: "100%" }}
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
  );
};
export default EditModal;
