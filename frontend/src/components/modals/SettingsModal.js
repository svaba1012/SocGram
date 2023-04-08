import React from "react";

import CustomOptionModal from "./CustomOptionModal";

function SettingsModal({ open, handleClose }) {
  return (
    <CustomOptionModal
      open={open}
      handleClose={handleClose}
      withCancel
      options={[
        { text: "Change password", to: "/" },
        { text: "QR code", to: "/" },
        { text: "Applications and web locations", to: "/" },
        { text: "Notifications", to: "/" },
        { text: "Privacy and security", to: "/" },
        { text: "Survailance", to: "/" },
        { text: "Signin activity", to: "/" },
        { text: "E-mails from SocGram", to: "/" },
        { text: "Sign out", to: "/" },
      ]}
    />
  );
}

export default SettingsModal;
