import { useState } from 'react';
import AttachmentIcon from '../../../assets/icons/AttachmentIcon';
import Button from '../../button/Button';
import SelectInput from '../../input/SelectInput';
import { classNames } from '../../../components/helpers/helpers';
import './ProjectCommentForm.css';

const ProjectCommentForm = ({
  submitCommentHandler,
  privateSetting,
  privacySettingHandler,
  privacyList,
  commentId,
  commentRef,
}) => {
  const [value, setValue] = useState('');
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
    const setting = privateSetting === 'Public' ? 'PUB' : 'PRI';
    if (value === '') {
      setError(true);
      return;
    }
    submitCommentHandler(value, setting, commentId);
    setValue('');
  };
  return (
    <>
      <div className="row">
        <div className="position-relative">
          <textarea
            // className="w-100 rounded-6 border px-3 py-3"
            className={classNames(
              'w-100 rounded-6 border px-3 py-3',
              error ? 'border-danger' : ''
            )}
            rows="4"
            placeholder="Write comment about this Project"
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            ref={commentRef}
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
      <div className="d-flex justify-content-between mt-4">
        <div className="col-5">
          <SelectInput placeHolder="Private" selectedItem={privateSetting}>
            {privacyList.map((item) => (
              <div
                key={item.id}
                onClick={() => privacySettingHandler(item.id)}
                className="cursor-pointer select-input-item py-2 ps-4"
              >
                {item.value}
              </div>
            ))}
          </SelectInput>
        </div>
        <div className="text-end">
          <Button
            customClassName="btn btn-primary rounded-2 border text-13 border-primary py-2 px-3 mt-3 mt-md-0 text-white"
            onClick={handleSubmitComment}
          >
            Comment
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProjectCommentForm;
