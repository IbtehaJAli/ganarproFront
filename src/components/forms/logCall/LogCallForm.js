import AttachmentIcon from "../../../assets/icons/AttachmentIcon";
import SelectInput from "../../input/SelectInput";

const LogCallForm = ({
  selectedSortItem,
  sortItems,
  handleSelectedSortItem,
  setShowLogCallModal
}) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-6">
          <div>
            <SelectInput
              placeHolder="Select Your Trade"
              selectedItem={selectedSortItem}
            >
              {sortItems.map(item => (
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
          <p className="mt-3">Base Bid</p>
        </div>
        <div className="col-2">
          <div>
            <input
              type="time"
              className="scope-input w-100 rounded-3 px-2 py-2"
              placeholder="$ 0.00"
            />
          </div>
          <p className="mt-3">$400</p>
        </div>
      </div>
      <div className="mt-1">
        <textarea
          className="w-100 rounded-6 border px-3 py-3"
          rows="4"
          placeholder="Message"
        ></textarea>
      </div>
      <div className="d-flex justify-content-between">
        <button
          onClick={() => setShowLogCallModal(true)}
          className="text-13 fw-bold bg-white rounded-2 border border-primary mt-3 py-2 px-3 text-primary"
        >
          <AttachmentIcon
            fill="#276FB4"
            className="me-2"
            width="12"
            height="18"
          />
          Attach Files
        </button>
        <button className="text-13 fw-bold bg-primary rounded-2 border border-primary py-2 mt-3 px-3 text-white">
          Log Call
        </button>
      </div>
    </div>
  );
};

export default LogCallForm;
