import {
  Box,
  Modal,
  ListItem,
  List,
  ListItemText,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React, { useState } from "react";
import { connect } from "react-redux";

import NewPostFormUpload from "../forms/NewPostForm/NewPostFormUpload";
import NewPostFormCrop1 from "../forms/NewPostForm/NewPostFormCrop1";
import {
  setNewPostModalTab,
  processCroppingOfImages,
  setNewPostModalWindowWidth,
  resetModalState,
} from "../../actions";
import NewPostFormFinish from "../forms/NewPostForm/NewPostFormFinish";
import QuitingNewPostModal from "./QuitingNewPostModal";

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
  isEnd,
}) {
  return (
    <div style={{ display: selectedIndex === index ? "block" : "none" }}>
      <List>
        <ListItem divider>
          {moveOnPrev ? (
            <Button onClick={moveOnPrev}>
              <ArrowBackIcon />
            </Button>
          ) : (
            ""
          )}
          <ListItemText
            primary={label}
            sx={{ textAlign: "center" }}
          ></ListItemText>
          {moveOnNext ? (
            <Button onClick={moveOnNext}>{isEnd ? "Post" : "Next"}</Button>
          ) : (
            ""
          )}
        </ListItem>
        {children}
      </List>
    </div>
  );
}

function NewPostModal(props) {
  const {
    open,
    handleClose,
    setNewPostModalTab,
    processCroppingOfImages,
    setNewPostModalWindowWidth,
    resetModalState,
  } = props;

  let [isQuitingModalOpen, setIsQuitingModalOpen] = useState(false);
  if (!props.modalState) {
    return;
  }
  let tabIndex = props.modalState.tabIndex;

  style.width = props.modalState.windowWidth;

  const quitModal = () => {
    handleClose();
    resetModalState();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (tabIndex === 0) {
          quitModal();
        } else {
          setIsQuitingModalOpen(true);
        }
      }}
    >
      <Box sx={style}>
        <ModalTab selectedIndex={tabIndex} index={0} label={"Make a new post"}>
          <NewPostFormUpload
            moveOnNext={() => {
              props.setNewPostModalTab(1);
            }}
          />
        </ModalTab>
        <ModalTab
          selectedIndex={tabIndex}
          index={1}
          label={"Customise"}
          moveOnNext={() => {
            setNewPostModalTab(2);
            processCroppingOfImages();
            setNewPostModalWindowWidth(800);
          }}
          moveOnPrev={() => setNewPostModalTab(0)}
        >
          <NewPostFormCrop1 moveOnNext={() => setNewPostModalTab(2)} />
        </ModalTab>
        <ModalTab
          selectedIndex={tabIndex}
          index={2}
          label={"Customise"}
          moveOnNext={() => console.log("posting")}
          moveOnPrev={() => {
            setNewPostModalWindowWidth(400);
            setNewPostModalTab(1);
          }}
          isEnd
        >
          <NewPostFormFinish />
        </ModalTab>

        <QuitingNewPostModal
          open={isQuitingModalOpen}
          handleClose={() => setIsQuitingModalOpen(false)}
          quit={() => {
            setIsQuitingModalOpen(false);
            quitModal();
          }}
        />
      </Box>
    </Modal>
  );
}

const mapState = (state) => {
  return { modalState: state.newPostModalState };
};

export default connect(mapState, {
  setNewPostModalTab,
  processCroppingOfImages,
  setNewPostModalWindowWidth,
  resetModalState,
})(NewPostModal);
