import React from "react";
import { Box, Modal, Fab } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import PostPage from "../pages/PostPage";
import { useNavigate, useParams } from "react-router-dom";

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

function ProfilePostModal({ open, handleClose, profilePosts }) {
  let { pid } = useParams();
  let navigate = useNavigate();
  let currentPostIndex = profilePosts.findIndex((post) => post._id === pid);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Fab
          size="medium"
          onClick={() => {
            navigate(`/posts/${profilePosts[currentPostIndex - 1]._id}`);
          }}
          sx={{
            display: currentPostIndex === 0 ? "none" : "flex",
            position: "absolute",
            left: "0px",
            top: "50%",
            transform: "translate(-150%, -50%)",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <KeyboardArrowLeft />
        </Fab>
        <Fab
          size="medium"
          onClick={() => {
            navigate(`/posts/${profilePosts[currentPostIndex + 1]._id}`);
          }}
          sx={{
            display:
              currentPostIndex === profilePosts.length - 1 ? "none" : "flex",
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translate(150%, -50%)",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <KeyboardArrowRight />
        </Fab>
        <PostPage></PostPage>
      </Box>
    </Modal>
  );
}

export default ProfilePostModal;
