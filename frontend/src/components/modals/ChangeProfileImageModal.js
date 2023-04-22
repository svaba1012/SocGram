import React, { useRef } from "react";
import { connect } from "react-redux";

import CustomOptionModal from "./CustomOptionModal";
import {
  removeProfileImage,
  changeProfileImage,
} from "../../actions/user-actions";

function ChangeProfileImageModal({
  open,
  handleClose,
  profile,
  changeProfileImage,
  removeProfileImage,
}) {
  let fileInputRef = useRef();
  return (
    <div>
      <CustomOptionModal
        open={open}
        handleClose={handleClose}
        withCancel
        headerText={"Change profile picture."}
        options={[
          {
            text: "Add photo",
            onClick: () => {
              fileInputRef.current.click();
              handleClose();
            },
            confirm: true,
          },
          {
            text: "Remove current photo",
            onClick: () => {
              removeProfileImage(profile._id);
              handleClose();
            },
            warning: true,
          },
        ]}
      />
      <input
        ref={fileInputRef}
        type="file"
        style={{ visibility: "hidden" }}
        onChange={() => {
          let newProfileImage = fileInputRef.current.files[0];
          changeProfileImage(profile._id, newProfileImage);
        }}
      />
    </div>
  );
}

const mapState = (state) => {
  return { profile: state.profile };
};

export default connect(mapState, { removeProfileImage, changeProfileImage })(
  ChangeProfileImageModal
);
