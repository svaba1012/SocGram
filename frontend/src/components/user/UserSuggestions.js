import { List } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getSuggestionsForUser } from "../../actions/user-actions";
import UserSuggestionListItem from "./UserSuggestionListItem";

function UserSuggestions({ userId, getSuggestionsForUser, suggestions }) {
  useEffect(() => {
    getSuggestionsForUser(userId);
  }, []);
  if (!suggestions.suggestions) {
    return <div></div>;
  }
  return (
    <List>
      {suggestions.suggestions.map((suggestion) => (
        <UserSuggestionListItem suggestion={suggestion} />
      ))}
    </List>
  );
}

const mapState = (state) => {
  return { suggestions: state.userSuggestions };
};

export default connect(mapState, { getSuggestionsForUser })(UserSuggestions);
