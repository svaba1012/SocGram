import React from "react";
import { connect } from "react-redux";
import { Button, ListItem } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

import { setNewPostImages } from "../../../actions/new-post-actions";

function NewPostFormUpload(props) {
  const { moveOnNext } = props;
  return (
    <div>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <div>
          <InsertPhotoOutlinedIcon sx={{ fontSize: 150 }} />
        </div>
        <div>
          <SlideshowOutlinedIcon sx={{ fontSize: 150 }} />
        </div>
      </ListItem>
      <ListItem sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              let files = e.target.files;
              if (files.length === 0) {
                props.setNewPostImages([]);
                return;
              }

              files = [...Array(files.length).keys()].map((i) => {
                return {
                  file: files[i],
                  url: URL.createObjectURL(files[i]),
                  zoom: 0,
                };
              });

              props.setNewPostImages(files);

              if (files.length > 0) {
                moveOnNext();
              }
            }}
          />
        </Button>
      </ListItem>
    </div>
  );
}

const mapState = (state) => {
  return {};
};

export default connect(mapState, { setNewPostImages })(NewPostFormUpload);
