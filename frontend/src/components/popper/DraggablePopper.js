import React from "react";
import { Paper, Button, Typography, Box } from "@mui/material";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import CustomTooltip from "../reusables/CustomTooltip";

function DraggablePopper({
  startPosition,
  user,
  onCloseClicked,
  handleDrag,
  position,
  handleOnDragEnd,
}) {
  return (
    <Draggable
      defaultPosition={startPosition}
      bounds={"parent"}
      onDrag={handleDrag}
      onStop={handleOnDragEnd}
      position={position}
    >
      <Box
        sx={{
          minWidth: "50px",
          cursor: "grabbing",
          zIndex: 200,
          position: "absolute",
        }}
      >
        <CustomTooltip
          label={user.username}
          style={{
            minWidth: "50px",
            cursor: "grabbing",
            zIndex: 200,
            position: "absolute",
          }}
          onCloseClicked={onCloseClicked}
        />{" "}
      </Box>

      {/* 
        <Box
          sx={{
            position: "relative",

            mt: "10px",
            "&::before": {
              backgroundColor: "#262626",

              content: '""',
              display: "block",
              position: "absolute",
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
          <Typography sx={{ p: 0.5, marginRight: "5px" }}>
            {user.username}
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={onCloseClicked} />
        </Box>
      </Box> */}
    </Draggable>
  );
}

export default DraggablePopper;
