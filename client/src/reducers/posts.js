import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

const handlers = {
  [START_LOADING]: (state) => {
    return { ...state, isLoading: true };
  },
  [END_LOADING]: (state) => {
    return { ...state, isLoading: false };
  },
  [FETCH_ALL]: (state, action) => {
    return {
      ...state,
      posts: action.payload.data,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages,
    };
  },
  [CREATE]: (state, action) => {
    return { ...state, posts: [...state.posts, action.payload] };
  },
  [UPDATE]: (state, action) => {
    return {
      ...state,
      posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      ),
    };
  },
  [DELETE]: (state, action) => {
    return {
      ...state,
      posts: state.posts.filter((post) => post._id !== action.payload),
    };
  },
  [FETCH_BY_SEARCH]: (state, action) => {
    return { ...state, posts: action.payload };
  },
  [FETCH_POST]: (state, action) => {
    return { ...state, post: action.payload };
  },
};

export default (state = { isLoading: true, posts: [] }, action) => {
  const handler = handlers[action.type] || ((state) => state);
  return handler(state, action);
};
