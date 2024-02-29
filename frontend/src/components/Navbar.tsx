import { Box, Tab, Typography } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { useAppState } from "../providers/AppContext";

function Navbar() {
  const { setShowPengaturan, setShowKegiatan, valueNavbar, setValueNavbar } =
    useAppState();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueNavbar(newValue);
  };

  const handlerKegiatan = () => {
    setShowKegiatan(true);
    setShowPengaturan(false);
  };

  const handlerPengaturan = () => {
    setShowPengaturan(true);
    setShowKegiatan(false);
  };

  return (
    <Box
      sx={{
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        marginBottom: "1rem",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          height: 10,
          marginBottom: "0.4rem",
          marginLeft: "1.25rem",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem" }}>HH Timesheet</Typography>
      </Box>
      <Box
        sx={{
          typography: "body1",
          marginTop: "1rem",
          marginLeft: "1.25rem",
        }}
      >
        <TabContext value={valueNavbar}>
          <Box sx={{ borderBottom: 1, borderColor: "transparent" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ fontSize: "0.75rem" }}
                onClick={() => handlerKegiatan()}
                label="Daftar Kegiatan"
                value="1"
              />
              <Tab
                sx={{ fontSize: "0.75rem" }}
                onClick={() => handlerPengaturan()}
                label="Pengaturan"
                value="2"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Navbar;
