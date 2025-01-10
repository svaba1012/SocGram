import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import React from "react";

function UserSuggestionListItemSkeleton({ key }) {
  return (
    <ListItem key={key} sx={{ padding: "2px" }}>
      <ListItemAvatar sx={{ minWidth: "40px" }}>
        <Skeleton
          sx={{ width: "35px", height: "35px" }}
          variant="circular"
        ></Skeleton>
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton sx={{ fontSize: "0.9em", width: "90%" }}></Skeleton>}
        secondary={
          <Skeleton sx={{ fontSize: "0.9em", width: "70%" }}></Skeleton>
        }
        sx={{ marginRight: "40px", paddingLeft: "5px" }}
      ></ListItemText>{" "}
    </ListItem>
  );
}

export default UserSuggestionListItemSkeleton;
