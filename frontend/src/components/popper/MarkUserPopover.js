import * as React from "react";
import { connect } from "react-redux";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

import SearchUser from "../user/SearchUser";
import DraggablePopper from "./DraggablePopper";
import {
  setPositionOfTagged,
  addTaggedUser,
  removeTaggedUser,
} from "../../actions/tagged-users-actions";

function MarkUserPopover({
  imageId,
  children,
  style,
  addTaggedUser,
  setPositionOfTagged,
  removeTaggedUser,
  taggedUsers,
  isVisible,
  setIsVisible,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mouseX, setMouseX] = React.useState();
  const [mouseY, setMouseY] = React.useState();

  // !!!!!!!!
  // const [taggedUsers, setTaggedUsers] = React.useState([]);
  // !!!!!!!!

  const pictureAreaRef = React.useRef();
  const handleClick = (event) => {
    if (event.target.tagName !== "IMG") {
      return;
    }
    setAnchorEl(event.currentTarget);
    setMouseX(event.clientX);
    setMouseY(event.clientY);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div
        aria-describedby={id}
        onClick={handleClick}
        ref={pictureAreaRef}
        style={{ position: "relative" }}
      >
        {taggedUsers.map((taggedUser, id) => {
          if (taggedUser.imageId !== imageId || !isVisible) {
            return;
          }
          return (
            <DraggablePopper
              key={id}
              position={taggedUser.position}
              startPosition={taggedUser.startPosition}
              user={taggedUser.user}
              onCloseClicked={() => removeTaggedUser(id)}
              handleOnDragEnd={(e, ui) => {
                setPositionOfTagged(id, { x: ui.x, y: ui.y });
              }}
            />
          );
        })}

        {children}
      </div>

      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: mouseY, left: mouseX - 36 }}
        onClose={handleClose}
        sx={style}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::before": {
              backgroundColor: "white",
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
        <Box sx={{ backgroundColor: "white", width: "300px" }}>
          <SearchUser
            onItemClicked={(user) => {
              setIsVisible(true);
              handleClose();
              let pos = {
                x:
                  mouseX -
                  36 -
                  pictureAreaRef.current.getBoundingClientRect().x,
                y: mouseY - pictureAreaRef.current.getBoundingClientRect().y,
              };
              addTaggedUser(user, imageId, pos);
            }}
          />
        </Box>
      </Popover>
    </>
  );
}

const mapState = (state) => {
  return { taggedUsers: state.taggedUsers };
};

export default connect(mapState, {
  addTaggedUser,
  removeTaggedUser,
  setPositionOfTagged,
})(MarkUserPopover);
