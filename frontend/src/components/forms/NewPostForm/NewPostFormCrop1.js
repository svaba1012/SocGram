import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { connect } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import AspectRatioPopper from "../../popper/AspectRatioPopper";
import { setNewPostImageIndex, setNewPostImagesScroll } from "../../../actions";
import ImageCarousel from "./ImageCarousel";

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

function NewPostFormCrop1({
  files,
  aspectRatio,
  imageId,
  setNewPostImageIndex,
  setNewPostImagesScroll,
}) {
  // const [activeStep, setActiveStep] = React.useState(0);
  const [isImageGridVisible, setIsImageGridVisible] = React.useState(false);

  const scrollContainerRef = useRef([]);

  useEffect(() => {
    scrollContainerRef.current = scrollContainerRef.current.slice(
      0,
      files.length
    );
  }, [files]);

  if (!files || files.length === 0) {
    return;
  }

  return (
    <ImageCarousel
      withZoom
      tabsNum={files.length}
      additionalComponents={[
        <Grid
          container
          sx={{
            position: "absolute",
            top: "0px",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: isImageGridVisible ? 1 : 0,
          }}
        >
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
          <Grid item xs={4} sx={{ border: "1px solid white" }}></Grid>
        </Grid>,

        <AspectRatioPopper
          style={{
            position: "absolute",
            bottom: "20px",
            left: "10px",
            zIndex: 50,
          }}
          placement="top-start"
        />,
      ]}
    >
      {files.map((file, id) => {
        let scrollerStyle = {
          //objectFit: "cover",
          overflow: "auto",
        };
        scrollerStyle =
          aspectRatio === "4/5"
            ? {
                ...scrollerStyle,
                height: "inherit",
                aspectRatio: aspectRatio,
              }
            : {
                ...scrollerStyle,
                width: "inherit",
                aspectRatio: aspectRatio,
              };

        let imageHeight;
        let imageWidth;
        let zoomCoeficient = 1 + file.zoom / 100;
        if (file.width / file.height >= aspectRatioValues[aspectRatio]) {
          imageHeight = `${100 * zoomCoeficient}%`;
          imageWidth = `${
            (100 * file.width * zoomCoeficient * 1) /
            aspectRatioValues[aspectRatio] /
            file.height
          }%`;
        } else {
          imageWidth = `${100 * zoomCoeficient}%`;
          imageHeight = `${
            (100 *
              file.height *
              zoomCoeficient *
              aspectRatioValues[aspectRatio]) /
            file.width
          }%`;
        }
        let imageStyle = {
          height: imageHeight,
          width: imageWidth,
        };
        return (
          <ScrollContainer
            style={scrollerStyle}
            key={id}
            ref={(el) => (scrollContainerRef.current[id] = el)}
            onStartScroll={() => setIsImageGridVisible(true)}
            onEndScroll={() => {
              setIsImageGridVisible(false);
              const { scrollTop, scrollLeft } =
                scrollContainerRef.current[id].getElement();
              const scroll = { top: scrollTop, left: scrollLeft };
              setNewPostImagesScroll(id, scroll);
            }}
          >
            <img alt="Slika" src={file.url} style={imageStyle}></img>
          </ScrollContainer>
        );
      })}
    </ImageCarousel>
  );
}

const mapState = (state) => {
  return {
    files: state.newPostModalState.files,
    aspectRatio: state.newPostModalState.aspectRatio,
    imageId: state.newPostModalState.imageId,
  };
};

export default connect(mapState, {
  setNewPostImageIndex,
  setNewPostImagesScroll,
})(NewPostFormCrop1);
