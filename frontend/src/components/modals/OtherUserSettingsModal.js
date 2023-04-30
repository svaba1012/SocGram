import React from "react";

import CustomOptionModal from "./CustomOptionModal";

function OtherUserSettingsModal({ open, handleClose }) {
  return (
    <CustomOptionModal
      open={open}
      handleClose={handleClose}
      withCancel
      options={[
        { text: "Block", to: "/", warning: true },
        { text: "Block", to: "/", warning: true },
        { text: "Block", to: "/", warning: true },
      ]}
    />
  );
}

export default OtherUserSettingsModal;
