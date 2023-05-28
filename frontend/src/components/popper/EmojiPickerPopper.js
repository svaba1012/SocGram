import React from "react";
import EmojiPicker from "emoji-picker-react";
import { Popover } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

function EmojiPickerPopper(props) {
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
      <SentimentSatisfiedAltIcon
        aria-describedby={id}
        onClick={handleClick}
        size="small"
        sx={{ cursor: "pointer" }}
      />

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
        <EmojiPicker
          searchDisabled={true}
          emojiStyle="google"
          previewConfig={{
            showPreview: false,
          }}
          onEmojiClick={(emoji) => {
            props.handleOnClick(emoji);
            handleClose();
          }}
        />
      </Popover>
    </div>
  );
}

export default EmojiPickerPopper;
