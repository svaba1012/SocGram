import { Box, Modal, ListItem, List, ListItemText } from "@mui/material";

import React from "react";
import { connect } from "react-redux";

import NewPostFormUpload from "../forms/NewPostForm/NewPostFormUpload";
import NewPostFormCrop from "../forms/NewPostForm/NewPostFormCrop";
import { setNewPostModalTab } from "../../actions";

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

function NewPostModal(props) {
  const { open, handleClose } = props;
  if (!props.modalState) {
    return;
  }
  let tabIndex = props.modalState.tabIndex;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ModalTab selectedIndex={tabIndex} index={0} label={"Make a new post"}>
          <NewPostFormUpload
            moveOnNext={() => {
              props.setNewPostModalTab(1);
            }}
          />
        </ModalTab>
        <ModalTab selectedIndex={tabIndex} index={1} label={"Customise"}>
          <NewPostFormCrop moveOnNext={() => setNewPostModalTab(2)} />
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

const mapState = (state) => {
  return { modalState: state.newPostModalState };
};

export default connect(mapState, { setNewPostModalTab })(NewPostModal);
