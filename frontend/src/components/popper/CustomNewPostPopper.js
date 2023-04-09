import React from "react";
import { Popper, Box, Fab } from "@mui/material";

function CustomNewPostPopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{ zIndex: 2000 }}
        placement={props.placement}
      >
        {props.children}
      </Popper>
    </div>
  );
}

export default CustomNewPostPopper;
