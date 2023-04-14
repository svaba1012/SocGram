import React, { cloneElement, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, MobileStepper, Fab } from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import ZoomPopper from "../../popper/ZoomPopper";

function ImageCarousel(props) {
  const [activeImage, setActiveImage] = useState(0);

  const theme = useTheme();

  const handleNext = () => {
    setActiveImage(activeImage + 1);
  };

  const handleBack = () => {
    setActiveImage(activeImage - 1);
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
          {props.children.map((child, id) => {
            let childInCorousel = cloneElement(child, {
              style: {
                ...child.props.style,
                display: activeImage === id ? "block" : "none",
              },
              key: id,
            });

            return childInCorousel;
          })}
        </Box>
        {props.additionalComponents.map((component, id) => {
          component = cloneElement(component, { key: id });
          return component;
        })}

        {props.withZoom ? (
          <ZoomPopper
            style={{
              position: "absolute",
              bottom: "20px",
              left: "60px",
              zIndex: 50,
            }}
            imageId={activeImage}
            placement="top-start"
          />
        ) : (
          ""
        )}

        <Fab
          size="small"
          onClick={handleNext}
          sx={{
            display: activeImage === props.tabsNum - 1 ? "none" : "flex",
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
            display: activeImage === 0 ? "none" : "flex",
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
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <MobileStepper
            variant="dots"
            steps={props.tabsNum}
            position="static"
            activeStep={activeImage}
            sx={{
              flexGrow: 1,
              backgroundColor: "unset",
              justifyContent: "center",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ImageCarousel;
