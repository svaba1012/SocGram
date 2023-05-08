import server from "../config/server";
import {
  ADD_ANSWER_ON_COMMENT,
  ADD_COMMENT,
  SET_NEW_COMMENT_AS_ANSWER_COMMENT,
  SET_NEW_COMMENT_TEXT,
} from "./types";

const POST_BASE_ROUTE = "/api/posts";

export const setNewCommentText = (text) => {
  return { type: SET_NEW_COMMENT_TEXT, payload: text };
};

export const setNewCommentAsAnswerComment = (
  commentId,
  creatorUsername = null
) => {
  return {
    type: SET_NEW_COMMENT_AS_ANSWER_COMMENT,
    payload: {
      answerOnCommentId: commentId,
      answerOnCommentUsername: creatorUsername,
    },
  };
};

export const addComment = (postId) => async (dispatch, getState) => {
  let state = getState();
  let user = state.user;
  let creator = user.userId;
  let { text, answerOnCommentId, answerOnCommentUsername } = state.newComment;
  // id of comment that is answered to

  console.log("Ima nade");
  let res = await server.post(`${POST_BASE_ROUTE}/${postId}/comments`, {
    creator,
    text,
    commentId: answerOnCommentId,
    answerUser: answerOnCommentUsername,
  });
  let comment = {
    ...res.data.comment,
    creator: {
      _id: creator,
      profileImage: user.profileImage,
      username: user.username,
    },
  };
  if (answerOnCommentId) {
    dispatch({
      type: ADD_ANSWER_ON_COMMENT,
      payload: { comment, commentId: answerOnCommentId },
    });
    return;
  }
  dispatch({ type: ADD_COMMENT, payload: comment });
};
