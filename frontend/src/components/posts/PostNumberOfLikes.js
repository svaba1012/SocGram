import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import server from "../../config/server";

function PostNumberOfLikes({ post, withoutPadding }) {
  if (!post.likes) {
    return <div></div>;
  }

  
  return (
    <Box>
      <ListItem sx={{ paddingTop: "0px", paddingLeft: withoutPadding?"0px": "" }}>
        {/* <ListItemAvatar> */}
        <AvatarGroup>
          {post.likes.map((user, id) => (
            <Avatar
              src={`${server.getUri()}/${user.profileImage}`}
              alt={user.username}
              sx={{ width: 24, height: 24 }}
              key={id}
            ></Avatar>
          ))}
        </AvatarGroup>
        {/* </ListItemAvatar> */}
        {post.numOfLikes > 0 ? (
          <ListItemText
            primary={
              <span>
                Liked by{" "}
                <Link
                  style={{
                    fontWeight: 900,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  to={`/profile/${post.likes[0].username}`}
                >
                  {post.likes[0].username}
                </Link>
                {post.numOfLikes > 1 ? (
                  <span>
                    {" "}
                    and{" "}
                    <Link
                      style={{
                        fontWeight: 900,
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      to="./liked_by"
                    >
                      {post.numOfLikes - 1} more
                    </Link>
                  </span>
                ) : (
                  ""
                )}
              </span>
            }
          ></ListItemText>
        ) : (
          ""
        )}
      </ListItem>
    </Box>
  );
}

export default PostNumberOfLikes;
