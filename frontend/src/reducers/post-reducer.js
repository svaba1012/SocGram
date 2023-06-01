import {
  ADD_ANSWER_ON_COMMENT,
  ADD_COMMENT,
  GET_ANSWERS_OF_COMMENT,
  GET_ANSWERS_OF_COMMENT_LOADING,
  GET_COMMENTS_BY_POST_ID,
  GET_COMMENTS_BY_POST_ID_LOADING,
  GET_POST_BY_ID,
  GET_POST_BY_ID_LOADING,
  GET_USERS_WHO_LIKED,
  GET_USER_PROFILES_BY_IDS,
  HIDE_ANSWERS,
  LIKE_POST,
  REMOVE_POST_LIKE,
  SET_IS_LIKE,
  SET_LIKE_IS_SENDING,
  SET_POST_ENTERED_FROM_PROFILE,
  SHOW_ANSWERS,
} from "../actions/types";

const postReducer = (state = {}, action) => {
  let likes;
  switch (action.type) {
    case GET_POST_BY_ID:
      return {
        ...action.payload,
        likedBy: state.likedBy,
        isEnteredFromProfile: state.isEnteredFromProfile,
        comments: [],
      };
    case GET_POST_BY_ID_LOADING:
      return {
        isLoading: true,
        isEnteredFromProfile: state.isEnteredFromProfile,
      };
    case GET_COMMENTS_BY_POST_ID:
      let page = state.commentPage;
      if (!page) {
        page = 0;
      }
      page++;

      let postComments = [...state.comments];
      return {
        ...state,
        commentsLoading: false,
        commentPage: page,
        comments: [...postComments, ...action.payload],
      };
    case GET_COMMENTS_BY_POST_ID_LOADING:
      return { ...state, commentsLoading: true };

    case SHOW_ANSWERS:
      let comments3 = JSON.parse(JSON.stringify([...state.comments]));

      let commentIndex3 = comments3.findIndex(
        (comment) => comment._id === action.payload.commentId
      );

      comments3[commentIndex3].answersShowed = action.payload.answersShowed;
      return { ...state, comments: comments3 };
    case GET_ANSWERS_OF_COMMENT:
      // deep copy
      let comments = JSON.parse(JSON.stringify([...state.comments]));

      let commentIndex = comments.findIndex(
        (comment) => comment._id === action.payload.commentId
      );
      comments[commentIndex].answersLoading = false;
      comments[commentIndex].answersPage = action.payload.page;

      if (!comments[commentIndex].answers) {
        comments[commentIndex].answers = [];
      }

      comments[commentIndex].answers = [
        ...comments[commentIndex].answers,
        ...action.payload.answers,
      ];
      return { ...state, comments };
    case GET_ANSWERS_OF_COMMENT_LOADING:
      let comments2 = JSON.parse(JSON.stringify([...state.comments]));

      let commentIndex2 = comments2.findIndex(
        (comment) => comment._id === action.payload.commentId
      );
      comments2[commentIndex2].answersShowed = true;

      comments2[commentIndex2].answersLoading = true;
      return { ...state, comments: comments2 };

    case ADD_ANSWER_ON_COMMENT:
      let comments1 = JSON.parse(JSON.stringify([...state.comments]));
      let commentIndex1 = comments1.findIndex(
        (comment) => comment._id === action.payload.commentId
      );
      if (!comments1[commentIndex1].answers) {
        comments1[commentIndex1].answers = [];
      }
      comments1[commentIndex1].answers = [
        ...comments1[commentIndex1].answers,
        action.payload.comment,
      ];
      comments1[commentIndex1].answersIds = [
        ...comments1[commentIndex1].answersIds,
        action.payload.comment._id,
      ];
      comments1[commentIndex1].answersShowed = true;
      return { ...state, comments: comments1 };

    case GET_USER_PROFILES_BY_IDS:
      if (action.payload.type !== "likedBy") {
        return { ...state };
      }
      return { ...state, likedBy: action.payload.users };
    case GET_USERS_WHO_LIKED:
      return { ...state, likedBy: action.payload };

    case LIKE_POST:
      if (!state.likesIds) {
        return { ...state };
      }
      likes = [...state.likesIds];
      return { ...state, likesIds: [...likes, action.payload.uid] };
    case REMOVE_POST_LIKE:
      if (!state.likesIds) {
        return { ...state };
      }
      likes = [...state.likesIds];
      return {
        ...state,
        likesIds: likes.filter((like) => like !== action.payload.uid),
      };
    case SET_POST_ENTERED_FROM_PROFILE:
      return { ...state, isEnteredFromProfile: action.payload };
    case ADD_COMMENT:
      if (!state.comments) {
        state.comments = [];
      }
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    default:
      return { ...state };
  }
};

export default postReducer;
