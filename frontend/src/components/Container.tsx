import { Box } from "@mui/material";
import { useAppState } from "../providers/AppContext";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { showKegiatan } = useAppState();
  return showKegiatan ? (
    <Box
      sx={{
        display: "grid",
        marginRight: 1,
        marginLeft: 1,
        backgroundColor: "white",
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {children}
    </Box>
  ) : null;
};

export default Container;
