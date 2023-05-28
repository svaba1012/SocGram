import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CustomTooltip({ style, label, onCloseClicked, linkTo }) {
  return (
    <Box sx={style}>
      <Box
        sx={{
          position: "relative",
          mt: "10px",
          "&::before": {
            backgroundColor: "#262626",
            position: "absolute",
            content: '""',
            display: "block",
            width: 12,
            height: 12,
            top: -6,
            transform: "rotate(45deg)",
            left: "calc(30px)",
          },
        }}
      />
      <Box
        sx={{
          backgroundColor: "#262626",
          borderRadius: "5px",
          color: "white",
          display: "flex",
          alignItems: "center",
          zIndex: 201,
        }}
      >
        <Typography
          sx={{
            p: 0.5,
            marginRight: "5px",
            color: "inherit",
            textDecoration: "none",
          }}
          to={linkTo ? linkTo : ""}
          component={linkTo ? Link : ""}
        >
          {label}
        </Typography>
        {!!onCloseClicked ? (
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onCloseClicked} />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default CustomTooltip;
