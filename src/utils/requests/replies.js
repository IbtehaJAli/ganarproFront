import { api } from '../constants/api';
import { post$, delete$, put$ } from './index';

export const saveReplyAPI = (commentId, data) => {
  return post$(
    api.replies.saveReply.replace(':commentId', commentId),
    data,
    {},
    true
  );
};

export const editReplyAPI = (commentId, replyId, data) => {
  let url = api.replies.editReply.replace(':commentId', commentId);
  return put$(url.replace(':replyId', replyId), data, {}, true);
};


export const deleteReplyAPI = (commentId, replyId) => {
  let url = api.replies.deleteReply.replace(':commentId', commentId);
  return delete$(url.replace(':replyId', replyId));
};