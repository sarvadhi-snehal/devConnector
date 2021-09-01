import axios from "axios";
import { setAlert } from "./alert";
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, DELETE_COMMENT, ADD_COMMENT } from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = id => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//add post
export const addPost = formData => async (dispatch) => {

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  const res =  await axios.post("/api/posts" , formData, config);
  
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post created', 'sucesss'))
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
   await axios.put(`api/posts/like/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'sucesss'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};



export const removeLike = id => async (dispatch) => {
    try {
      const res = await axios.put(`api/posts/unlike/${id}`);
      dispatch({
        type: UPDATE_LIKES,
        payload: { id, likes: res.data },
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  
   //add comment
export const addComment = (postId, formData) => async (dispatch) => {
 
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts/comment/${postId}` , formData, config);
 
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment adeed', 'success')); 
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  if(window.confirm("Are you sure, this can NOT be undone?")){

    try {
     const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
  
      dispatch(setAlert("Your comment is removed", "danger"));
    } catch (err) {
 
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }

  };