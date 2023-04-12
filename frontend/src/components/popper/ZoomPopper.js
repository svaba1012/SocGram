import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

import CustomNewPostPopper from "./CustomNewPostPopper";
import { connect } from "react-redux";
import { Slider, Box } from "@mui/material";

import { setNewPostImagesZoom } from "../../actions";

function ZoomPopper({
  style,
  placement,
  imageZoom,
  imageId,
  setNewPostImagesZoom,
}) {
  const handleChange = (event, newValue) => {
    setNewPostImagesZoom(imageId, newValue);
  };

  return (
    <CustomNewPostPopper
      style={style}
      label={<ZoomInIcon />}
      placement={placement}
    >
      <Box
        sx={{
          borderRadius: 3,
          backgroundColor: "white",
          opacity: 0.8,
          width: "150px",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <Slider value={imageZoom} onChange={handleChange}></Slider>
      </Box>
    </CustomNewPostPopper>
  );
}

const mapState = (state) => {
  let imageId = state.newPostModalState.imageId;

  return { imageZoom: state.newPostModalState.files[imageId].zoom, imageId };
};

export default connect(mapState, { setNewPostImagesZoom })(ZoomPopper);
