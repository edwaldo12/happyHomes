import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useAppState } from "../providers/AppContext";

const CardOptions = () => {
  interface PengaturanState {
    name: string;
    rate: number;
  }

  const {
    setShowKegiatan,
    setShowPengaturan,
    valuePengaturan,
    setValuePengaturan,
    setValueNavbar,
    showPengaturan,
    setmessageSucceed,
    setShowSuccedModal,
  } = useAppState();
  const [valueTemp, setvalueTemp] = useState<PengaturanState>(valuePengaturan);

  const changePengaturanValue = () => {
    setValuePengaturan(valueTemp);
    setmessageSucceed("Berhasil Ubah Pengaturan");
    setShowKegiatan(true);
    setValueNavbar("1");
    setShowPengaturan(false);
    setShowSuccedModal(true);
  };

  const backToMenu = () => {
    setShowKegiatan(true);
    setValueNavbar("1");
    setShowPengaturan(false);
  };

  if (!showPengaturan) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "30vw", boxShadow: 3 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Nama Karyawan
          </Typography>
          <TextField
            fullWidth
            id="name"
            defaultValue={valuePengaturan.name}
            margin="normal"
            onChange={(e) =>
              setvalueTemp({ ...valueTemp, name: e.target.value })
            }
          />
          <Typography gutterBottom variant="h6" component="div">
            Rate
          </Typography>
          <TextField
            fullWidth
            id="rate"
            defaultValue={valuePengaturan.rate.toString()}
            margin="normal"
            InputProps={{
              endAdornment: <Typography variant="body2">/Jam</Typography>,
            }}
            onChange={(e) =>
              setvalueTemp({ ...valueTemp, rate: parseInt(e.target.value) })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button sx={{ mr: 1 }} variant="outlined" onClick={backToMenu}>
              Batalkan
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={changePengaturanValue}
            >
              Simpan
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardOptions;
