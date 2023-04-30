import React from "react";
import { Box, Divider, List, Modal } from "@mui/material";

import UserListItem from "../user/UserListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  borderRadius: "10px",
  boxShadow: 24,
  outline: 0,
};

function ListOfUsersModal({ open, handleClose, header, users }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <List>
          {header}
          <Divider />
          {users.map((user, id) => (
            <UserListItem user={user} key={id} />
          ))}
        </List>
      </Box>
    </Modal>
  );
}

export default ListOfUsersModal;
