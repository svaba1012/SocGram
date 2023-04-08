import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

import "./PostProfile.css";

function PostProfile(props) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img src="#" alt="Slika" style={{ width: "100%", height: "100%" }} />
      {props.isTagged ? (
        ""
      ) : (
        <div className="image-hover">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "3px",
              color: "white",
              opacity: 1,
            }}
          >
            <FavoriteIcon /> <span> 23</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "3px",
              color: "white",
              opacity: 1,
            }}
          >
            <ModeCommentIcon /> <span> 21</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostProfile;
