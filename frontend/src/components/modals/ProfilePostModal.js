import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import PostPage from "../pages/PostPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",

  height: "90vh",
  borderRadius: "10px",
  boxShadow: 24,
  outline: 0,
};

function ProfilePostModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PostPage></PostPage>
      </Box>
    </Modal>
  );
}

export default ProfilePostModal;
