import { updateObject } from '../../../utils/helpers/helper';
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
} from '../../actionTypes/index';

const initialState = {
  comments: null,
  loading: false,
  error: null,
  newComment: null,
  replies: null,
};

const commentStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const saveCommentSuccess = (state, action) => {
  if (action.edited) {
    return editCommentSuccess(state, action);
  }
  return updateObject(state, {
    newComment: action.data,
    comments: [...state.comments, action.data],
    loading: false,
    error: null,
  });
};

const editCommentSuccess = (state, action) => {
  const commentIndex = state.comments?.findIndex(
    (comm) => comm.id === action.data.id
  );
  state.comments.splice(commentIndex, 1, action.data);
  return updateObject(state, {
    newComment: action.data,
    comments: [...state.comments],
    loading: false,
    error: null,
  });
};

const getCommentSuccess = (state, action) => {
  return updateObject(state, {
    comments: action.data,
    loading: false,
    error: null,
  });
};

const deleteCommentSuccess = (state, action) => {
  const newComments = state.comments?.filter(
    (comm) => comm.id !== action.commentId
  );
  return updateObject(state, {
    comments: newComments,
    loading: false,
    error: null,
  });
};

const deleteReplySuccess = (state, action) => {

  const commentIndex = state.comments?.findIndex(
    (comm) => comm.id === action.commentId
  );

  const foundComment = state.comments[commentIndex];

  const newReplies = foundComment.project_replies.filter(
    (comment) => comment.id !== action.replyId
  );
  foundComment.project_replies = newReplies;
  state.comments.splice(commentIndex, 1, foundComment);

  return updateObject(state, {
    comments: [...state.comments],
    loading: false,
    error: null,
  });
};

const commentFailed = (state, action) => {
  return updateObject(state, {
    comments: action.data,
    loading: false,
    error: null,
  });
};

const replyStart = (state) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const saveReplySuccess = (state, action) => {
  if (action.edited) {
    return editReplySuccess(state, action);
  }
  return updateObject(state, {
    loading: false,
    error: null,
    replies: [...state.replies, action.data],
  });
};

const editReplySuccess = (state, action) => {
  const commentIndex = state.comments?.findIndex(
    (comm) => comm.id === action.commentId
  );

  const replyIndex = state.comments[commentIndex]?.project_replies?.findIndex(
    (comm) => comm.id === action.replyId
  );
  state.comments[commentIndex]?.project_replies?.splice(replyIndex, 1, action.data);
  return updateObject(state, {
    comments: [...state.comments],
    loading: false,
    error: null,
  });
}

const replyFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const projects = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_START:
      return commentStart(state, action);
    case SAVE_COMMENT_SUCCESS:
      return saveCommentSuccess(state, action);
    case GET_COMMENT_SUCCESS:
      return getCommentSuccess(state, action);
    case COMMENT_FAILED:
      return commentFailed(state, action);
    case DELETE_COMMENT_SUCCESS:
      return deleteCommentSuccess(state, action);
    case DELETE_REPLY_SUCCESS:
      return deleteReplySuccess(state, action);
    case REPLY_START:
      return replyStart(state, action);
    case SAVE_REPLY_SUCCESS:
      return saveReplySuccess(state, action);
    case REPLY_FAILED:
      return replyFailed(state, action);
    default:
      return state;
  }
};

export default projects;
