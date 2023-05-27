import {
  ADD_TAGGED_USER,
  REMOVE_TAGGED_USER,
  SET_POSITION_OF_TAGGED_USER,
} from "./types";

export const addTaggedUser = (user, imageId, pos) => {
  return {
    type: ADD_TAGGED_USER,
    payload: { user, imageId, position: pos, startPosition: pos },
  };
};

export const removeTaggedUser = (id) => {
  return { type: REMOVE_TAGGED_USER, payload: id };
};

export const setPositionOfTagged = (id, pos) => async (dispatch) => {
  dispatch({ type: SET_POSITION_OF_TAGGED_USER, payload: { id, pos } });
};
