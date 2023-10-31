import { useState } from 'react';
import Button from '../../button/Button';
import FormInput from '../../input/FormInput';

const SaveSearchForm = ({
  queryString,
  closeSaveSearch,
  saveSearchHandler,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    setTouched(true);
  };
  const handleBlur = (evt) => {
    const { value } = evt.target;

    // remove whatever error was there previously
    // const { [name]: removedError, ...rest } = errors;
    setError(false);

    // check for a new error
    const nameError = value === '' ? true : false;
    setError(nameError && touched);
  };
  return (
    <div>
      <div>
        <div className="mt-5">
          <FormInput
            label="Search Name"
            type="text"
            name="searchName"
            placeholder="Search Name"
            value={searchValue}
            error={error}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <textarea
            className="w-100 rounded-6 border px-3 py-3"
            rows="4"
            placeholder="Message"
            disabled
          >
            {queryString}
          </textarea>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Button
            customClassName="btn-outline-secondary-intel"
            onClick={closeSaveSearch}
          >
            Cancel
          </Button>
          <Button
            customClassName="btn-primary"
            btndisabled={error || searchValue === ''}
            onClick={() => saveSearchHandler(searchValue)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveSearchForm;
