import {
  ADD_TAGGED_USER,
  REMOVE_TAGGED_USER,
  SET_POSITION_OF_TAGGED_USER,
} from "../actions/types";

const taggedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case REMOVE_TAGGED_USER:
      return state.filter((el, i) => i !== action.payload);
    case ADD_TAGGED_USER:
      return [...state, action.payload];
    case SET_POSITION_OF_TAGGED_USER:
      return state.map((user, i) => {
        if (i === action.payload.id) {
          return {
            ...user,
            position: {
              x: action.payload.pos.x,
              y: action.payload.pos.y,
            },
          };
        }
        return user;
      });
    default:
      return [...state];
  }
};

export default taggedUsersReducer;
