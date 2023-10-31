import { useState, useEffect } from "react";
import SelectInput from "../../../components/input/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import ProjectComment from "../../../components/projectComment/ProjectComment";
import {
  saveComment,
  getProjectComment,
  deleteProjectComment,
  saveCommentReply,
  editComment,
  deleteCommentReply,
  editReply,
} from "../../../store/actions/projects/comments.action";
import { allComments } from "../../../store/selectors/projects/comments.selector";

const sortItems = [
  {
    id: 1,
    key: "most_recent",
    value: "Most Recent",
  },
  {
    id: 2,
    key: "most_popular",
    value: "Most Popular",
  },
];

const Comments = ({ projectId }) => {
  const [selectedSortItem, setSelectedSortItem] = useState();
  const [actionModal, setActionModal] = useState(false);
  const [displayReplyCommentForm, setDisplayReplyCommentForm] = useState();
  const [displayReplyForm, setDisplayReplyForm] = useState();
  const [displayEditCommentForm, setDisplayEditCommentForm] = useState();
  const [displayEditReplyForm, setDisplayEditReplyForm] = useState({
    commentId: "",
    replyId: "",
  });

  const dispatch = useDispatch();
  const comments = useSelector(allComments());

  const handleSelectedSortItem = (itemId) => {
    const item = sortItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
  };

  const handleSubmitComment = (value, privacy) => {
    let formData = new FormData();
    formData.append("note", value);
    formData.append("type", privacy);
    dispatch(saveComment(projectId, formData));
  };

  const handleGetComment = () => {
    if (projectId) {
      dispatch(getProjectComment(projectId));
    }
  };

  // useEffect(() => {
  //   handleGetComment();
  // }, [handleGetComment]);

  const handleDeleteComment = (commentId) => {
    dispatch(deleteProjectComment(projectId, commentId));
    handleCloseModal();
  };

  const handleDeleteReply = (commentId, replyId) => {
    dispatch(deleteCommentReply(commentId, replyId));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setActionModal(false);
  };

  const handleToggleModal = () => {
    setActionModal(!actionModal);
  };

  const handleDisplayReplyCommentForm = (commentId) => {
    if (displayReplyCommentForm === commentId) {
      setDisplayReplyCommentForm(0);
      return;
    }
    setDisplayReplyCommentForm(commentId);
  };

  const handleDisplayReplyForm = (replyId) => {
    if (displayReplyForm === replyId) {
      setDisplayReplyForm(0);
      return;
    }

    setDisplayReplyForm(replyId);
  };

  const handleDisplayEditCommentForm = (commentId) => {
    setDisplayEditCommentForm(commentId);
  };

  const handleDisplayEditReplyForm = (commentId, replyId) => {
    setDisplayEditReplyForm({
      commentId,
      replyId,
    });
  };

  const handleSubmitReply = (commentId, formData) => {
    dispatch(saveCommentReply(commentId, formData));
    dispatch(getProjectComment(projectId));
  };

  const handleEditComment = (reply, commentId) => {
    let formData = new FormData();
    formData.append("note", reply);
    formData.append("type", "PUB");
    formData.append("project_id", projectId);
    dispatch(editComment(projectId, commentId, formData));
    setDisplayEditCommentForm(0);
  };

  const handleEditReply = (commentId, replyId, reply) => {
    let formData = new FormData();
    formData.append("reply_note", reply);
    formData.append("type", "PUB");
    dispatch(editReply(commentId, replyId, formData));
    setDisplayEditReplyForm({});
  };

  return (
    <div className="px-2">
      <div>
        <div className="d-flex justify-content-space-between align-items-center mb-5">
          <div className="text-13">Order comments by:</div>
          <div className="ms-4 col-5">
            <SelectInput
              placeHolder="Most recent"
              selectedItem={selectedSortItem}
            >
              {sortItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectedSortItem(item.id)}
                  className="cursor-pointer select-input-item py-2 ps-4"
                >
                  {item.value}
                </div>
              ))}
            </SelectInput>
          </div>
        </div>

        <div>
          <ProjectComment
            comments={comments}
            submitCommentHandler={handleSubmitComment}
            deleteCommentHandler={handleDeleteComment}
            deleteReplyHandler={handleDeleteReply}
            actionModal={actionModal}
            displayReplyComment={displayReplyCommentForm}
            displayReplyForm={displayReplyForm}
            displayEditCommentForm={displayEditCommentForm}
            displayEditReplyForm={displayEditReplyForm}
            actionModalHandler={handleToggleModal}
            closeModalHandler={handleCloseModal}
            displayReplyCommentHandler={handleDisplayReplyCommentForm}
            displayReplyFormHandler={handleDisplayReplyForm}
            displayEditCommentFormHandler={handleDisplayEditCommentForm}
            displayEditReplyFormHandler={handleDisplayEditReplyForm}
            submitReplyHandler={handleSubmitReply}
            submitEditCommentHandler={handleEditComment}
            submitEditReplyHandler={handleEditReply}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
