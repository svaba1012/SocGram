import React from "react";
import { IconButton, ListItem, ListItemIcon, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function PostAddComment({ post, id }) {
  return (
    <ListItem sx={{ width: "100%" }}>
      <TextField
        id={id}
        variant="standard"
        size="small"
        placeholder="Add comment"
        InputProps={{ disableUnderline: true }}
        sx={{ width: "95%" }}
      ></TextField>
      <ListItemIcon>
        <IconButton>
          <SendRoundedIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}

export default PostAddComment;
