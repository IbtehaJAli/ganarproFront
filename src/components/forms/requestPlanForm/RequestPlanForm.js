import SelectInput from "../../input/SelectInput";

const RequestPlanForm = ({
  selectedSortItem,
  sortItems,
  handleSelectedSortItem,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-6 w-100">
          <div>
            <SelectInput
              placeHolder="Select Your Trade"
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
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input type="text" id="subject" className="form-control py-2" />
      </div>
      <div className="mt-5">
        <textarea
          className="w-100 rounded-6 border px-3 py-3"
          rows="4"
          placeholder="Message"
        ></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button className="text-13 ms-auto fw-bold bg-primary rounded-2 border border-primary py-2 mt-3 px-3 text-white">
          Request Plans
        </button>
      </div>
    </div>
  );
};

export default RequestPlanForm;
