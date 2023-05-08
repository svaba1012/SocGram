import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CollectionsIcon from "@mui/icons-material/Collections";

import server from "../../config/server";
import "./PostProfile.css";

function PostProfile({ post, isTagged, handleOnClick }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => {
        handleOnClick();
        navigate(`/posts/${post._id}`);
      }}
    >
      <img
        src={`${server.getUri()}/${post.multimedias[0]}`}
        alt="Slika"
        style={{ width: "100%", height: "100%" }}
      />
      {post.multimedias.length > 1 ? (
        <CollectionsIcon
          sx={{
            position: "absolute",
            right: "15px",
            top: "15px",
            color: "white",
          }}
        />
      ) : (
        ""
      )}
      {isTagged ? (
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
            <FavoriteIcon /> <span> {post.likes.length}</span>
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
            <ModeCommentIcon /> <span> {post.numOfComments}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostProfile;
