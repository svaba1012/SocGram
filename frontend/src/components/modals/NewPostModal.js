import {
  Box,
  Modal,
  TabPanel,
  Button,
  ListItem,
  List,
  ListItemText,
  AvatarGroup,
  Avatar,
  Slider,
} from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import React, { useState } from "react";
import NewPostFormUpload from "../forms/NewPostForm/NewPostFormUpload";
import NewPostFormCrop from "../forms/NewPostForm/NewPostFormCrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  borderRadius: "10px",
  boxShadow: 24,
  outline: 0,
};

function ModalTab({
  selectedIndex,
  index,
  label,
  moveOnNext,
  moveOnPrev,
  children,
}) {
  return (
    <div style={{ display: selectedIndex === index ? "block" : "none" }}>
      <List>
        <ListItem divider>
          <ListItemText
            primary={label}
            sx={{ textAlign: "center" }}
          ></ListItemText>
        </ListItem>
        {children}
      </List>
    </div>
  );
}

function NewPostModal({ open, handleClose }) {
  let [tabIndex, setTabIndex] = useState(0);
  let [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ModalTab selectedIndex={tabIndex} index={0} label={"Make a new post"}>
          <NewPostFormUpload
            files={uploadedFiles}
            setFiles={setUploadedFiles}
            moveOnNext={() => {
              setTabIndex(1);
            }}
          />
        </ModalTab>
        <ModalTab selectedIndex={tabIndex} index={1} label={"Customise"}>
          <NewPostFormCrop
            files={uploadedFiles}
            moveOnNext={() => setTabIndex(2)}
          />
        </ModalTab>
        <ModalTab
          selectedIndex={tabIndex}
          index={2}
          label={"Customise"}
        ></ModalTab>
        <ModalTab
          selectedIndex={tabIndex}
          index={3}
          label={"Customise"}
        ></ModalTab>
        <ModalTab
          selectedIndex={tabIndex}
          index={4}
          label={"Customise"}
        ></ModalTab>
      </Box>
    </Modal>
  );
}

export default NewPostModal;
