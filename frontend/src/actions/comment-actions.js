import {
  GET_ANSWERS_OF_COMMENT,
  GET_ANSWERS_OF_COMMENT_LOADING,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LOADING,
  HIDE_ANSWERS,
  SHOW_ANSWERS,
} from "./types";
import server from "../config/server";

const POST_BASE_ROUTE = "/api/posts";

export const getCommentsByPostId = (postId) => async (dispatch, getState) => {
  dispatch({
    type: GET_COMMENTS_BY_POST_ID_LOADING,
  });

  let page = getState().post.commentPage;
  if (!page) {
    page = 0;
  }
  let res = await server.get(
    `${POST_BASE_ROUTE}/${postId}/comments?page=${page}`
  );
  dispatch({
    type: GET_COMMENTS_BY_POST_ID,
    payload: res.data.comments,
  });
};

export const getAnswersOfComment =
  (pid, cid, show = true, load = true) =>
  async (dispatch, getState) => {
    if (!show) {
      dispatch({
        type: SHOW_ANSWERS,
        payload: { commentId: cid, answersShowed: false },
      });
      return;
    }
    if (!load) {
      dispatch({
        type: SHOW_ANSWERS,
        payload: { commentId: cid, answersShowed: true },
      });
      return;
    }
    dispatch({
      type: GET_ANSWERS_OF_COMMENT_LOADING,
      payload: { commentId: cid },
    });

    let comment = getState().post.comments.find(
      (comment) => comment._id === cid
    );
    let page = comment.answersPage;
    if (!page) {
      page = 0;
    }

    let res = await server.get(
      `${POST_BASE_ROUTE}/${pid}/comments/${cid}/answers?page=${page}`
    );
    dispatch({
      type: GET_ANSWERS_OF_COMMENT,
      payload: { answers: res.data.answers, commentId: cid, page: page + 1 },
    });
  };
