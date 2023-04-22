import React from "react";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import Crop32Icon from "@mui/icons-material/Crop32";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";

import CustomNewPostPopper from "./CustomNewPostPopper";
import { connect } from "react-redux";

import { setNewPostImageAspectRatio } from "../../actions/new-post-actions";

function AspectRatioPopper({ style, aspectRatio, setAspectRatio, placement }) {
  const handleChange = (event, newAspectRatio) => {
    setAspectRatio(newAspectRatio);
  };
  return (
    <CustomNewPostPopper
      style={style}
      label={<AspectRatioIcon />}
      placement={placement}
    >
      <Box sx={{ borderRadius: 3, backgroundColor: "white", opacity: 0.8 }}>
        <ToggleButtonGroup
          orientation="vertical"
          color="primary"
          value={aspectRatio}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="1/1">
            1:1 <CropSquareIcon />
          </ToggleButton>
          <ToggleButton value="4/5">
            4:5 <CropPortraitIcon />
          </ToggleButton>
          <ToggleButton value="16/9">
            {" "}
            16:9 <Crop32Icon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </CustomNewPostPopper>
  );
}

const mapState = (state) => {
  return { aspectRatio: state.newPostModalState.aspectRatio };
};

export default connect(mapState, {
  setAspectRatio: setNewPostImageAspectRatio,
})(AspectRatioPopper);
