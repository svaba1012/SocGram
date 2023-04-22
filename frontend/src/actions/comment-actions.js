import { GET_COMMENTS_BY_POST_ID } from "./types";
import server from "../config/server";

const POST_BASE_ROUTE = "/api/posts";

export const getCommentsByPostId = (postId) => async (dispatch) => {
  let res = await server.get(`${POST_BASE_ROUTE}/${postId}/comments`);
  dispatch({
    type: GET_COMMENTS_BY_POST_ID,
    payload: res.data.comments,
  });
};
