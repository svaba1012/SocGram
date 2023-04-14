import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import ImageCarousel from "./ImageCarousel";
import { TextField, Divider } from "@mui/material";

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

function NewPostFormFinish(props) {
  if (!props.imagesUrls || props.imagesUrls.length === 0) {
    return <div></div>;
  }

  let ratio = aspectRatioValues[props.aspectRatio];

  let imageStyle =
    ratio > 1
      ? { width: "100%", aspectRatio: props.aspectRatio }
      : { height: "100%", aspectRatio: props.aspectRatio };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50%" }}>
        <ImageCarousel
          tabsNum={props.imagesUrls.length}
          additionalComponents={[]}
        >
          {props.imagesUrls.map((url, id) => (
            <Box sx={imageStyle} key={id}>
              <img
                src={url}
                alt="slika"
                style={{ width: "100%", height: "100%" }}
              ></img>
            </Box>
          ))}
        </ImageCarousel>
      </Box>
      <Divider orientation="vertical" flexItem />

      <Box sx={{ width: "50%", padding: "10px" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Alo"></Avatar>
          </ListItemAvatar>
          <ListItemText primary="username" />
        </ListItem>
        <TextField
          id="filled-textarea"
          label="Description of a post..."
          placeholder="Placeholder"
          multiline
          rows={6}
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
}

const mapState = (state) => {
  return {
    imagesUrls: state.newPostModalState.cropedFilesUrl,
    aspectRatio: state.newPostModalState.aspectRatio,
  };
};

export default connect(mapState)(NewPostFormFinish);
