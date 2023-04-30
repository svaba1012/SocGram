import React from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Divider,
} from "@mui/material";

import ImageCarousel from "../../reusables/ImageCarousel";
import server from "../../../config/server";
import { setNewPostModalDescription } from "../../../actions/new-post-actions";

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
            <Avatar
              alt={props.user.username}
              src={`${server.getUri()}/${props.user.profileImage}`}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.user.username} />
        </ListItem>
        <TextField
          id="filled-textarea"
          label="Description of a post..."
          placeholder="Placeholder"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
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
    user: state.user,
    imagesUrls: state.newPostModalState.cropedFilesUrl,
    aspectRatio: state.newPostModalState.aspectRatio,
    description: state.newPostModalState.description,
  };
};

export default connect(mapState, {
  setDescription: setNewPostModalDescription,
})(NewPostFormFinish);
