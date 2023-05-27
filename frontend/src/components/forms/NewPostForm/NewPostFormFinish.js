import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Divider,
  Fab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import ImageCarousel from "../../reusables/ImageCarousel";
import server from "../../../config/server";
import { setNewPostModalDescription } from "../../../actions/new-post-actions";
import MarkUserPopover from "../../popper/MarkUserPopover";

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

function NewPostFormFinish(props) {
  let [isMarkedVisible, setIsMarkedVisible] = useState(true);

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
          additionalComponents={[
            <Fab
              sx={{
                position: "absolute",
                bottom: "20px",
                left: "10px",
                zIndex: 50,
              }}
              aria-describedby={"Proba"}
              type="button"
              onClick={() => {
                setIsMarkedVisible(!isMarkedVisible);
              }}
              size="small"
            >
              {" "}
              <PersonIcon />{" "}
            </Fab>,
          ]}
        >
          {props.imagesUrls.map((url, id) => (
            <Box
              sx={{ ...imageStyle, cursor: "crosshair" }}
              key={id}
              onClick={() => {}}
            >
              <MarkUserPopover
                style={{ width: "80%" }}
                imageId={id}
                isVisible={isMarkedVisible}
                setIsVisible={(isVis) => setIsMarkedVisible(isVis)}
              >
                <img
                  src={url}
                  alt="slika"
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </MarkUserPopover>
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
