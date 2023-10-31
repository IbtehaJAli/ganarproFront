import Dropdown from "../../../components/dropdown/Dropdown";
import { filterArray } from "../../../data/projectBoardFilter";
const SizeFilter = ({ title }) => {
  return (
    <Dropdown title={title} customClassName="boardlist-nav-drop">
      <div className="black-100 text-start px-4 py-5">
        <p className="mb-4 fw-bold text-13">Size</p>
        <div className="mb-5 text-12">
          {filterArray[1]?.values?.map((value, index) => (
            <div key={index + 1} className="mb-4">
              <input type="checkbox" className="me-3" />
              <label htmlFor="">{value}</label>
            </div>
          ))}
        </div>
        <div className="w-100 mt-4">
          <button className="w-100 btn text-12 btn-primary py-3">Done</button>
        </div>
      </div>
    </Dropdown>
  );
};

export default SizeFilter;
