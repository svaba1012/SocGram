import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Fab from "@mui/material/Fab";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Grid } from "@mui/material";
import { connect } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import AspectRatioPopper from "../../popper/AspectRatioPopper";
import ZoomPopper from "../../popper/ZoomPopper";
import { setNewPostImageIndex, setNewPostImagesScroll } from "../../../actions";

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

function NewPostFormCrop({
  files,
  aspectRatio,
  imageId,
  setNewPostImageIndex,
  setNewPostImagesScroll,
}) {
  const theme = useTheme();
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
  const handleNext = () => {
    setNewPostImageIndex(imageId + 1);
  };

  const handleBack = () => {
    setNewPostImageIndex(imageId - 1);
  };

  return (
    <Box
      sx={{
        aspectRatio: "1/1",
        position: "relative",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          width: "100%",
          height: "100%",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {files.map((file, id) => {
          let scrollerStyle = {
            display: id === imageId ? "block" : "none",
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
              ref={(el) => (scrollContainerRef.current[id] = el)}
              onStartScroll={() => setIsImageGridVisible(true)}
              onEndScroll={() => {
                setIsImageGridVisible(false);
                const { scrollTop, scrollLeft } =
                  scrollContainerRef.current[id].getElement();
                console.log(scrollTop + " , " + scrollLeft);
                const scroll = { top: scrollTop, left: scrollLeft };
                setNewPostImagesScroll(id, scroll);
              }}
            >
              <img alt="Slika" src={file.url} style={imageStyle}></img>
            </ScrollContainer>
          );
        })}
      </Box>
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
      </Grid>

      <Fab
        size="small"
        onClick={handleNext}
        sx={{
          display: imageId === files.length - 1 ? "none" : "flex",
          position: "absolute",
          right: "10px",
          top: "50%",
          color: "white",
          backgroundColor: "grey",
          opacity: 0.7,
        }}
      >
        {/* Next */}
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Fab>

      <Fab
        size="small"
        onClick={handleBack}
        sx={{
          display: imageId === 0 ? "none" : "flex",
          position: "absolute",
          left: "10px",
          top: "50%",
          color: "white",
          backgroundColor: "grey",

          opacity: 0.7,
        }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        {/* Back */}
      </Fab>
      <AspectRatioPopper
        style={{
          position: "absolute",
          bottom: "20px",
          left: "10px",
          zIndex: 50,
        }}
        placement="top-start"
      />

      <ZoomPopper
        style={{
          position: "absolute",
          bottom: "20px",
          left: "60px",
          zIndex: 50,
        }}
        placement="top-start"
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
        }}
      >
        <MobileStepper
          variant="dots"
          steps={files.length}
          position="static"
          activeStep={imageId}
          sx={{
            flexGrow: 1,
            backgroundColor: "unset",
            justifyContent: "center",
          }}
        />
      </Box>
    </Box>
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
})(NewPostFormCrop);
