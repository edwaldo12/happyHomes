import React from "react";
import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid gray-200",
        backgroundColor: "white",
        margin: "0.5rem",
        paddingTop: "0.625rem",
        paddingBottom: "0.625rem",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginLeft: "1.25rem" }}>
        <Box>
          <Typography sx={{ color: "#F15858" }}>Timesheet</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#F15858" }}>Management</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
