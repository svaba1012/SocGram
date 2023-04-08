import React from "react";
import { Button, ListItem, List, ListItemText } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

function NewPostFormUpload({ moveOnNext, setFiles }) {
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
              setFiles(e.target.files);
              if (e.target.files.length > 0) {
                moveOnNext();
              }
              console.log(e.target.files);
            }}
          />
        </Button>
      </ListItem>
    </div>
  );
}

export default NewPostFormUpload;
