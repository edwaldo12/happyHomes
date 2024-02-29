import { Box, Typography, Modal } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAppState } from "../providers/AppContext";

const style = {
  position: "absolute" as const,
  top: "50%" as const,
  left: "50%" as const,
  transform: "translate(-50%, -50%)" as const,
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  borderColor: "divider",
  boxShadow: 24,
  p: 4,
};

const ModalSuceed = () => {
  const { messageSucceed, showSuceedModal, setShowSuccedModal } = useAppState();
  const closeModal = () => {
    setShowSuccedModal(false);
  };

  return (
    <>
      <Modal
        open={showSuceedModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon
                sx={{ fontSize: "4rem", color: "green" }}
              ></CheckCircleIcon>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Berhasil
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {messageSucceed}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ModalSuceed;
