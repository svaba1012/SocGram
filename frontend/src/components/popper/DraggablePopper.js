import React from "react";
import { Box } from "@mui/material";
import Draggable from "react-draggable";
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
    </Draggable>
  );
}

export default DraggablePopper;
