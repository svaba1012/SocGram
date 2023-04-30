import React from "react";
import { Fab, Popover } from "@mui/material";

function CustomNewPostPopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={props.style}>
      <Fab
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        size="small"
      >
        {props.label}
      </Fab>
      <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        sx={{ zIndex: 2000 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {props.children}
      </Popover>
    </div>
  );
}

export default CustomNewPostPopper;
