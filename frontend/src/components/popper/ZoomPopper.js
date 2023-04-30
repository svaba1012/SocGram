import React from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { connect } from "react-redux";
import { Slider, Box } from "@mui/material";

import CustomNewPostPopper from "./CustomNewPostPopper";
import { setNewPostImagesZoom } from "../../actions/new-post-actions";

function ZoomPopper(props) {
  let { style, placement, images, imageId, setNewPostImagesZoom } = props;
  if (!images || images.length === 0) {
    return <div></div>;
  }
  let imageZoom = images[imageId].zoom;
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
  return { images: state.newPostModalState.files };
};

export default connect(mapState, { setNewPostImagesZoom })(ZoomPopper);
