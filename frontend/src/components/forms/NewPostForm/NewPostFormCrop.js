import React, { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Fab from "@mui/material/Fab";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box, Grid } from "@mui/material";
import { connect } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import AspectRatioPopper from "../../popper/AspectRatioPopper";

function NewPostFormCrop({ files, aspectRatio }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isImageGridVisible, setIsImageGridVisible] = React.useState(false);

  if (!files) {
    return;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          let imageStyle = {
            display: id === activeStep ? "block" : "none",
            //objectFit: "cover",
            overflow: "auto",
          };
          imageStyle =
            aspectRatio === "4/5"
              ? { ...imageStyle, height: "inherit", aspectRatio: aspectRatio }
              : { ...imageStyle, width: "inherit", aspectRatio: aspectRatio };

          return (
            <ScrollContainer
              style={imageStyle}
              onStartScroll={() => setIsImageGridVisible(true)}
              onEndScroll={() => setIsImageGridVisible(false)}
            >
              <img alt="Slika" src={file.url}></img>
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
          display: activeStep === files.length - 1 ? "none" : "flex",
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
          display: activeStep === 0 ? "none" : "flex",
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
          activeStep={activeStep}
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
  };
};

export default connect(mapState, {})(NewPostFormCrop);
