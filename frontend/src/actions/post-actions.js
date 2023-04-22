import server from "../config/server";
import { GET_POST_BY_ID, GET_PROFILE_POSTS } from "./types";

const POST_BASE_ROUTE = "/api/posts";

export const getProfilePosts = () => async (dispatch, getState) => {
  let uid = getState().profile._id;
  let res = await server.get(`${POST_BASE_ROUTE}`, {
    params: { creator: uid },
  });

  dispatch({ type: GET_PROFILE_POSTS, payload: res.data.posts });
};

export const getPostById = (pid) => async (dispatch) => {
  let res = await server.get(`${POST_BASE_ROUTE}/${pid}`);

  dispatch({ type: GET_POST_BY_ID, payload: res.data.post });
};
