import { useState, useRef } from 'react';
import profile from '../../assets/icons/profile.svg';
import indicator from '../../assets/icons/indicator-gray.svg';
import down from '../../assets/icons/down-gray.svg';
import like from '../../assets/icons/like.svg';
import comment from '../../assets/icons/comment.svg';
import pencil from '../../assets/icons/pencil-one.svg';
import trash from '../../assets/icons/trash.svg';
import dayjs from 'dayjs';

import './ProjectComment.css';
import ProjectCommentForm from '../forms/projectCommentForm/ProjectCommentForm';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { useSelector } from 'react-redux';
import { authUser } from '../../store/selectors/users/user.selector';
import EditCommentForm from '../forms/editcomment/EditCommentForm';

const displayItems = [
  {
    id: 1,
    key: 'PUB',
    value: 'Public',
  },
  {
    id: 2,
    key: 'PRI',
    value: 'Private',
  },
];

const ProjectComment = ({
  comments,
  actionModal,
  displayReplyComment,
  displayReplyForm,
  displayEditCommentForm,
  displayEditReplyForm,
  actionModalHandler,
  closeModalHandler,
  submitCommentHandler,
  deleteCommentHandler,
  deleteReplyHandler,
  displayReplyCommentHandler,
  displayReplyFormHandler,
  displayEditCommentFormHandler,
  displayEditReplyFormHandler,
  submitReplyHandler,
  submitEditCommentHandler,
  submitEditReplyHandler,
}) => {
  const [selectedSortItem, setSelectedSortItem] = useState();
  const [selectedComment, setSelectedComment] = useState({});
  const [selectedReply, setSelectedReply] = useState({});
  const [modalType, setModalType] = useState('');

  const commentRef = useRef();

  const authenticatedUser = useSelector(authUser());
  const handleSelectedSortItem = (itemId) => {
    const item = displayItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
  };

  const handleSelectedComment = (commentId) => {
    const foundComment = comments?.find((comment) => comment.id === commentId);
    setSelectedComment(foundComment);
    setModalType('comment');
    actionModalHandler();
  };

  const handleSelectedReply = (reply, commentId) => {
    setSelectedReply({ ...reply, commentId });
    setModalType('reply');
    actionModalHandler();
  };

  const handleDeleteComment = () => {
    if (modalType === 'comment') {
      deleteCommentHandler(selectedComment?.id);
    }
    if (modalType === 'reply') {
      deleteReplyHandler(selectedReply.commentId, selectedReply?.id);
    }
  };

  const formatDate = (created) => {
    const duration = dayjs(created).fromNow();
    return duration;
  };

  const handleSubmitReply = (value, setting, commentId) => {
    let formData = new FormData();
    formData.append('reply_note', value);
    formData.append('type', setting);
    submitReplyHandler(commentId, formData);
  };

  const scrollToMyRef = () => {
    commentRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDisplayReplyCommentHandler = (commentId) => {
    scrollToMyRef();
    displayReplyCommentHandler(commentId);
  };

  return (
    <div>
      <div className="mt-5">
        {comments?.map((comm) => (
          <div className="border-top px-2 pb-4" key={comm.id}>
            <div className="row d-flex pt-4">
              <div className="d-flex col-2 col-md-1">
                <div className="me-3">
                  <img src={profile} alt="profile" />
                </div>
              </div>
              <div className="d-grid col-9 col-md-9 mt-2 mt-md-4 mt-lg-2">
                <div className="d-flex align-items-center mb-2">
                  <p className="mb-0">
                    {comm.account?.fname} {comm.account?.lname}
                  </p>
                  <img src={indicator} alt="indicator" className="mx-2" />
                  <p className="mb-0 text-10 black-300">
                    {formatDate(comm.created)}
                  </p>
                </div>
                <div className="text-start mb-3">
                  {displayEditCommentForm === comm?.id ? (
                    <EditCommentForm
                      comment={comm.note}
                      commentId={comm.id || ''}
                      type="comment"
                      displayEditCommentFormHandler={
                        displayEditCommentFormHandler
                      }
                      submitEditCommentHandler={submitEditCommentHandler}
                    />
                  ) : (
                    comm.note
                  )}
                </div>
                <div className="container px-0">
                  <div className="row align-items-center flex-nowrap comment-action">
                    <div className="col">
                      <Button
                        customClassName="d-flex text-primary"
                        onClick={() => {}}
                      >
                        <img src={like} alt="like" className="me-2" />
                        <div className="d-flex align-items-md-center">
                          (0)
                          <span className="comment-action-label">likes</span>
                        </div>
                      </Button>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-md-center text-primary">
                        <Button
                          customClassName="d-flex align-items-md-center text-primary"
                          // onClick={() => displayReplyCommentHandler(comm.id)}
                          onClick={() =>
                            handleDisplayReplyCommentHandler(comm?.id)
                          }
                        >
                          <img src={comment} alt="comment" className="me-2" />
                          <div className="comment-action-label">Reply</div>
                        </Button>
                      </div>
                    </div>
                    <div className="col">
                      {authenticatedUser.account?.id === comm?.account?.id ? (
                        <Button
                          customClassName="d-flex align-items-md-center text-primary"
                          onClick={() => displayEditCommentFormHandler(comm.id)}
                        >
                          <img src={pencil} alt="pencil" className="me-2" />
                          <div className="comment-action-label">Edit</div>
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="col">
                      {authenticatedUser.account?.id === comm?.account?.id ? (
                        <div className="">
                          <Button
                            customClassName="d-flex align-items-md-center text-danger"
                            onClick={() => handleSelectedComment(comm.id)}
                          >
                            <img src={trash} alt="delete" className="me-2" />
                            <div className="comment-action-label">Delete</div>
                          </Button>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>

                {/* comment replies */}
                {comm?.project_replies?.map((reply) => (
                  <div className="border-top px-2 pb-4" key={reply.id}>
                    <div className="row d-flex pt-4">
                      <div className="d-flex col-2 col-md-1">
                        <div className="me-3">
                          <img src={profile} alt="profile" />
                        </div>
                      </div>
                      <div className="d-grid col-9 col-md-9 mt-2 mt-md-4 mt-lg-2">
                        <div className="d-flex align-items-center mb-2">
                          <p className="mb-0">
                            {reply.account?.fname} {reply.account?.lname}
                          </p>
                          <img
                            src={indicator}
                            alt="indicator"
                            className="mx-2"
                          />
                          <p className="mb-0 text-10 black-300">
                            {formatDate(reply.created)}
                          </p>
                        </div>
                        {/* <div className="text-start mb-3">{com.reply_note}</div> */}
                        <div className="text-start mb-3">
                          {displayEditReplyForm.replyId === reply?.id ? (
                            <EditCommentForm
                              comment={reply.reply_note}
                              commentId={comm.id || ''}
                              replyId={reply.id}
                              type="reply"
                              displayEditCommentFormHandler={
                                displayEditReplyFormHandler
                              }
                              submitEditReplyHandler={submitEditReplyHandler}
                            />
                          ) : (
                            reply.reply_note
                          )}
                        </div>
                        <div className="container">
                          <div className="row align-items-center flex-nowrap w-50 reply-action">
                            <div className="col">
                              <Button
                                customClassName="d-flex text-primary"
                                onClick={() => {}}
                              >
                                <img src={like} alt="like" className="me-2" />
                                <div className="d-flex align-items-md-center">
                                  (0)
                                  <span className="comment-action-label">
                                    likes
                                  </span>
                                </div>
                              </Button>
                            </div>
                            <div className="col">
                              <div className="d-flex align-items-md-center text-primary">
                                <Button
                                  customClassName="d-flex align-items-md-center text-primary"
                                  onClick={() =>
                                    displayReplyFormHandler(reply.id)
                                  }
                                >
                                  <img
                                    src={comment}
                                    alt="comment"
                                    className="me-2"
                                  />
                                  <div className="comment-action-label">
                                    Reply
                                  </div>
                                </Button>
                              </div>
                            </div>
                            <div className="col">
                              {authenticatedUser.account?.id ===
                              reply?.account?.id ? (
                                <Button
                                  customClassName="d-flex align-items-md-center text-primary"
                                  onClick={() =>
                                    displayEditReplyFormHandler(
                                      comm.id,
                                      reply.id
                                    )
                                  }
                                >
                                  <img
                                    src={pencil}
                                    alt="pencil"
                                    className="me-2"
                                  />
                                  <div className="comment-action-label">
                                    Edit
                                  </div>
                                </Button>
                              ) : (
                                ''
                              )}
                            </div>
                            <div className="col">
                              {authenticatedUser.account?.id ===
                              reply?.account?.id ? (
                                <div className="">
                                  <Button
                                    customClassName="d-flex align-items-md-center text-danger"
                                    onClick={() =>
                                      handleSelectedReply(reply, comm.id)
                                    }
                                  >
                                    <img
                                      src={trash}
                                      alt="delete"
                                      className="me-2"
                                    />
                                    <div className="comment-action-label">
                                      Delete
                                    </div>
                                  </Button>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        </div>
                        {displayReplyForm === reply.id ? (
                          <div className="my-2">
                            <ProjectCommentForm
                              submitCommentHandler={handleSubmitReply}
                              privateSetting={selectedSortItem}
                              privacySettingHandler={handleSelectedSortItem}
                              privacyList={displayItems}
                              commentId={comm.id || ''}
                            />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="col-1 mt-2 mt-md-4">
                        <img src={down} alt="profile" />
                      </div>
                    </div>
                    <Modal
                      title="Delete comment"
                      show={actionModal}
                      onCloseModal={closeModalHandler}
                    >
                      <div className="mb-5">{selectedComment?.note}</div>
                      <div className="d-flex justify-content-between mt-5">
                        <Button
                          customClassName="btn btn-danger text-white"
                          onClick={closeModalHandler}
                        >
                          Cancel
                        </Button>
                        <Button
                          customClassName="btn btn-primary text-white"
                          onClick={handleDeleteComment}
                        >
                          Delete
                        </Button>
                      </div>
                    </Modal>
                  </div>
                ))}
                {/* comment replies */}

                {displayReplyComment === comm.id ? (
                  <div className="my-2">
                    <ProjectCommentForm
                      submitCommentHandler={handleSubmitReply}
                      privateSetting={selectedSortItem}
                      privacySettingHandler={handleSelectedSortItem}
                      privacyList={displayItems}
                      commentId={comm.id || ''}
                      commentRef={commentRef}
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="col-1 mt-2 mt-md-4">
                <img src={down} alt="profile" />
              </div>
            </div>
            <Modal
              title={`Delete ${modalType}`}
              show={actionModal}
              onCloseModal={closeModalHandler}
            >
              <div className="mb-5">
                {modalType === 'comment'
                  ? selectedComment?.note
                  : selectedReply.reply_note}
              </div>
              <div className="d-flex justify-content-between mt-5">
                <Button
                  customClassName="btn btn-danger text-white"
                  onClick={closeModalHandler}
                >
                  Cancel
                </Button>
                <Button
                  customClassName="btn btn-primary text-white"
                  onClick={handleDeleteComment}
                >
                  Delete
                </Button>
              </div>
            </Modal>
          </div>
        ))}

        <div className="my-2">
          <div>
            <div className="">
              <ProjectCommentForm
                submitCommentHandler={submitCommentHandler}
                privateSetting={selectedSortItem}
                privacySettingHandler={handleSelectedSortItem}
                privacyList={displayItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComment;
