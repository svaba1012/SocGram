import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import ImageCarousel from "../reusables/ImageCarousel";
import server from "../../config/server";

import "./PostImageCarousel.css";
import CustomTooltip from "../reusables/CustomTooltip";

function PostImageCarousel({ post }) {
  let [isTaggedVisible, setIsTagVisible] = useState(false);
  let [likeIconStyleClasses, setLikeIconStyleClasses] = useState("like-icon ");
  return (
    <Box
      sx={{ height: "inherit", aspectRatio: "1/1", position: "relative" }}
      onClick={(e) => {
        if (e.detail == 2) {
          setLikeIconStyleClasses("like-icon like-icon-scale");
          setTimeout(() => {
            setLikeIconStyleClasses("like-icon ");
          }, 1005);
          // Implemet liking
        } else {
          setIsTagVisible(!isTaggedVisible);
          console.log("taggedUsers");
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          aspectRatio: "1/1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FavoriteRoundedIcon className={likeIconStyleClasses} />
      </Box>
      <ImageCarousel
        tabsNum={post.multimedias.length}
        additionalComponents={[]}
      >
        {post.multimedias.map((url, id) => (
          <div style={{ height: "100%", position: "relative" }}>
            {isTaggedVisible &&
              post.markedUsers.map((tag) => {
                if (tag.imageId !== id) {
                  return;
                }
                return (
                  <CustomTooltip
                    label={tag.userId.username}
                    style={{
                      position: "absolute",
                      ZIndex: 205,
                      cursor: "pointer",
                      top: `${tag.position.y * 100}%`,
                      left: `${tag.position.x * 100}%`,
                    }}
                    linkTo={`/profile/${tag.userId.username}`}
                  />
                );
              })}
            <img
              style={{ height: "100%" }}
              src={`${server.getUri()}/${url}`}
              alt="Slika"
              key={id}
            ></img>
          </div>
        ))}
      </ImageCarousel>
    </Box>
  );
}

export default PostImageCarousel;