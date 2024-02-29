import { Box, Typography } from "@mui/material";
import { moneyFormat } from "../utils/moneyHelper";
import { useAppState } from "../providers/AppContext";

const Card: React.FC = () => {
  const { valuePengaturan } = useAppState();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "gray-100",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "0.5rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem" }}>Nama Karyawan</Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          {valuePengaturan.name}{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "1rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem" }}>Rate</Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          {moneyFormat(valuePengaturan.rate)} / Jam{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
