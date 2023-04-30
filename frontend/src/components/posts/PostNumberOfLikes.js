import React, { useEffect } from "react";
import { connect } from "react-redux";
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
import { getUsersWhoLiked } from "../../actions/user-actions";

function PostNumberOfLikes({ post, getUsersWhoLiked }) {
  useEffect(() => {
    // getUserProfilesByIds(
    //   post.likes.filter((el, id) => id < 3),
    //   "likedBy"
    // );
    getUsersWhoLiked(post.likes.filter((el, id) => id < 3));
  }, []);

  if (!post.likedBy) {
    return;
  }

  return (
    <Box>
      <ListItem>
        <ListItemAvatar>
          <AvatarGroup>
            {post.likedBy.map((user, id) => (
              <Avatar
                src={`${server.getUri()}/${user.profileImage}`}
                alt={user.username}
                sx={{ width: 24, height: 24 }}
                key={id}
              ></Avatar>
            ))}
          </AvatarGroup>
        </ListItemAvatar>
        {post.likedBy.length > 0 ? (
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
                  to={`/profile/${post.likedBy[0].username}`}
                >
                  {post.likedBy[0].username}
                </Link>
                {post.likes.length > 0 ? (
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
                      {post.likes.length - 1} more
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

export default connect(null, { getUsersWhoLiked })(PostNumberOfLikes);
