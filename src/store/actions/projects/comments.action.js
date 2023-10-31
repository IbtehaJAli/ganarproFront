// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import { toastSuccess } from '../../../utils/helpers/helper';
import {
  saveCommentAPI,
  getCommentAPI,
  deleteCommentAPI,
  editCommentAPI,
} from '../../../utils/requests/projects';
import { saveReplyAPI, deleteReplyAPI, editReplyAPI } from '../../../utils/requests/replies';
import {
  GET_COMMENT_SUCCESS,
  SAVE_COMMENT_SUCCESS,
  COMMENT_FAILED,
  COMMENT_START,
  DELETE_COMMENT_SUCCESS,
  REPLY_START,
  SAVE_REPLY_SUCCESS,
  REPLY_FAILED,
  DELETE_REPLY_SUCCESS,
} from '../../actionTypes';

export const commentStart = () => {
  return {
    type: COMMENT_START,
  };
};

export const saveCommentSuccess = (data, edited = false) => {
  return {
    type: SAVE_COMMENT_SUCCESS,
    data,
    edited,
  };
};

export const commentFailed = (error) => {
  return {
    type: COMMENT_FAILED,
    error,
  };
};

export const getCommentSuccess = (data) => {
  return {
    type: GET_COMMENT_SUCCESS,
    data,
  };
};

export const deleteCommentSuccess = (data) => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    commentId: data,
  };
};

export const deleteReplySuccess = (commentId, replyId) => {
  return {
    type: DELETE_REPLY_SUCCESS,
    commentId,
    replyId,
  };
};

export const saveReplyStart = (data) => {
  return {
    type: REPLY_START,
  };
};

export const saveReplySuccess = (data, edited = false) => {
  return {
    type: SAVE_REPLY_SUCCESS,
    data,
    edited
  };
};

export const editReplySuccess = (data, commentId, replyId, edited = false) => {
  return {
    type: SAVE_REPLY_SUCCESS,
    data,
    commentId,
    replyId,
    edited,
  };
};

export const saveReplyFailed = (error) => {
  return {
    type: REPLY_FAILED,
    data: error,
  };
};

export const saveComment = (projectId, data) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return saveCommentAPI(projectId, data)
      .then(async (response) => {
        toastSuccess('Comment posted');
        dispatch(saveCommentSuccess(response.data));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};

export const editComment = (projectId, commentId, data) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return editCommentAPI(projectId, commentId, data)
      .then(async (response) => {
        toastSuccess('Changes saved');
        dispatch(saveCommentSuccess(response, true));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};

export const getProjectComment = (projectId, data) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return getCommentAPI(projectId, data)
      .then(async (response) => {
        dispatch(getCommentSuccess(response));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};

export const deleteProjectComment = (projectId, commentId) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return deleteCommentAPI(projectId, commentId)
      .then(async (response) => {
        toastSuccess('Comment deleted');
        dispatch(deleteCommentSuccess(commentId));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};

export const saveCommentReply = (commentId, data) => {
  return async (dispatch) => {
    dispatch(saveReplyStart());
    return saveReplyAPI(commentId, data)
      .then(async (response) => {
        toastSuccess('Reply successfull');
        dispatch(saveReplySuccess(commentId));
      })
      .catch((error) => {
        dispatch(saveReplyFailed('There was an error'));
      });
  };
};

export const editReply = (commentId, replyId, data) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return editReplyAPI(commentId, replyId, data)
      .then(async (response) => {
        toastSuccess('Changes saved');
        dispatch(editReplySuccess(response, commentId, replyId, true));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};

export const deleteCommentReply = (commentId, replyId) => {
  return async (dispatch) => {
    dispatch(commentStart());
    return deleteReplyAPI(commentId, replyId)
      .then(async (response) => {
        toastSuccess('Reply deleted');
        dispatch(deleteReplySuccess(commentId, replyId));
      })
      .catch(() => {
        dispatch(commentFailed('There was an error'));
      });
  };
};
