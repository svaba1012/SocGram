import React from "react";

import CustomOptionModal from "./CustomOptionModal";

function ChangeProfileImageModal({ open, handleClose }) {
  return (
    <CustomOptionModal
      open={open}
      handleClose={handleClose}
      withCancel
      headerText={"Change profile picture."}
      options={[
        { text: "Add photo", onClick: () => {}, confirm: true },
        { text: "Remove current photo", onClick: () => {}, warning: true },
      ]}
    />
  );
}

export default ChangeProfileImageModal;
