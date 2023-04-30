import { Avatar, Box, ListItem, ListItemText } from "@mui/material";
import React from "react";

import CustomOptionModal from "./CustomOptionModal";
import server from "../../config/server";

function StopFollowingModal({ open, handleClose, user }) {
  return (
    <CustomOptionModal
      open={open}
      handleClose={handleClose}
      withCancel
      options={[{ text: "Stop following", to: "/", warning: true }]}
      customHeader={
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt={user.username}
              src={`${server.getUri()}/${user.profileImage}`}
              sx={{ width: 100, height: 100 }}
            ></Avatar>
          </Box>
          <ListItem>
            <ListItemText
              sx={{ textAlign: "center" }}
              primary={`Stop following user @${user.username}`}
              secondary={`You can always send new following request.`}
            ></ListItemText>{" "}
          </ListItem>
        </>
      }
    />
  );
}

export default StopFollowingModal;
