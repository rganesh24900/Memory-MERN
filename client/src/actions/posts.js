import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.error(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({type:END_LOADING});
  } catch (error) {
    console.error(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({type:END_LOADING});

  } catch (error) {
    console.error(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING});
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({type:END_LOADING});

  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (currentId, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (currentId) => async (dispatch) => {
  try {
    await api.deletePost(currentId);
    dispatch({ type: DELETE, payload: currentId });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (currentId, post) => async (dispatch) => {
  try {
    const { data } = await api.likePost(currentId, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
