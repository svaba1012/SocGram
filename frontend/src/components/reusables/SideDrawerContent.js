import { Box, Typography } from "@mui/material";
import React from "react";

function SideDrawerContent({ title, width, children }) {
  return (
    <Box
      role="presentation"
      sx={{
        width: width,
        padding: "25px",
        paddingLeft: "100px",
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        fontWeight="bold"
        marginBottom={4}
      >
        {" "}
        {title}{" "}
      </Typography>

      {children}
    </Box>
  );
}

export default SideDrawerContent;
