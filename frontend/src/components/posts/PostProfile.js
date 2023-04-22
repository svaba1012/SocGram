import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import CollectionsIcon from "@mui/icons-material/Collections";

import "./PostProfile.css";
import server from "../../config/server";
import { Link, useNavigate } from "react-router-dom";

function PostProfile({ post, isTagged }) {
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
            <ModeCommentIcon /> <span> 23</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostProfile;
