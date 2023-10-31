import { useState } from 'react';
import AttachmentIcon from '../../../assets/icons/AttachmentIcon';
import Button from '../../button/Button';
import { classNames } from '../../../components/helpers/helpers';

const EditCommentForm = ({
  commentId,
  replyId,
  comment,
  type,
  displayEditCommentFormHandler,
  submitEditCommentHandler,
  submitEditReplyHandler,
}) => {
  const [value, setValue] = useState(comment);
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    setTouched(true);
  };
  const handleBlur = (evt) => {
    const { value } = evt.target;

    setError(false);

    // check for a new error
    const nameError = value === '' ? true : false;
    setError(nameError && touched);
  };

  const handleSubmitComment = () => {
    if (value === '') {
      setError(true);
      return;
    }
    if (type === 'comment') {
      submitEditCommentHandler(value, commentId);      
    }
    if (type === 'reply') {
      submitEditReplyHandler(commentId, replyId, value)
    }
    setValue('');
  };
  return (
    <>
      <div className="row">
        <div className="position-relative">
          <textarea
            className={classNames(
              'w-100 rounded-6 border px-3 py-3 w-100',
              error ? 'border-danger' : ''
            )}
            rows="4"
            placeholder="Write comment about this Project"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
          ></textarea>
          <div className="position-absolute comment-attachment">
            <AttachmentIcon width="24" height="24" fill="#CCCCCC" />
          </div>
        </div>
      </div>
      <div>
        {error ? (
          <div className="text-start text-danger text-10">
            Pleasse enter your comments
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <div className="me-2">
          <Button
            customClassName="btn btn-danger rounded-2 border text-13 py-2 px-3 mt-3 mt-md-0 text-white"
            onClick={() => displayEditCommentFormHandler(0)}
          >
            Cancel
          </Button>
        </div>
        <div className="text-end">
          <Button
            customClassName="btn btn-primary rounded-2 border text-13 border-primary py-2 px-3 mt-3 mt-md-0 text-white"
            onClick={handleSubmitComment}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditCommentForm;
