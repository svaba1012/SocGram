import React from "react";

import CustomOptionModal from "./CustomOptionModal";

function QuitingNewPostModal({ open, handleClose, quit }) {
  return (
    <CustomOptionModal
      open={open}
      handleClose={handleClose}
      withCancel
      headerText={"Are you sure that you want to quit editing new post?"}
      headerSubText={"All progress will be lost!"}
      options={[{ text: "Quit", onClick: quit, warning: true }]}
    />
  );
}

export default QuitingNewPostModal;
