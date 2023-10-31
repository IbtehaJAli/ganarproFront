import { DropdownButton, Dropdown } from "react-bootstrap";

const BuildingTypeFilter = ({
  title,
  filterData,
  handleFilter,
  handleSelectAll,
  submitFilter,
}) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      size="lg"
      title="Building Types"
      autoClose="outside"
    >
      <Dropdown.Item
        href="#/action-2"
        className="boardlist-building-nav-drop bg-white"
      >
        <div className="mb-5 text-12 col-md-12">
          <div className="mb-4 d-flex">
            <input
              type="checkbox"
              className="me-3"
              onChange={(e) => handleSelectAll(e, "building")}
            />
            <label htmlFor="" className="text-dark fs-5">
              Select All
            </label>
          </div>
          <div className="row-cols-4 row">
            {filterData?.map((value, index) => (
              <div key={index + 1} className="mb-4 d-flex">
                <input
                  type="checkbox"
                  className="me-3 building"
                  onChange={(e) => handleFilter(e.target, value.value)}
                />
                <label htmlFor="" className="text-dark fs-5">
                  {value.value}({value.count})
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-100 mt-4">
          <button
            className="w-100 btn text-12 btn-primary py-3"
            onClick={submitFilter}
          >
            Done
          </button>
        </div>
      </Dropdown.Item>
    </DropdownButton>

    // <Dropdown title={title} customClassName="boardlist-building-nav-drop">
    //   <div className="black-100 text-start px-4 py-5">
    //     <p className="mb-4 fw-bold text-13">Building Types</p>
    //     <div className="mb-5 text-12 row-cols-4 row">
    //       <div className="mb-4">
    //         <input
    //           type="checkbox"
    //           className="me-3"
    //           onChange={e => handleSelectAll(e, "building")}
    //         />
    //         <label htmlFor="">Select All</label>
    //       </div>
    //       {filterData?.map((value, index) => (
    //         <div key={index + 1} className="mb-4">
    //           <input
    //             type="checkbox"
    //             className="me-3 building"
    //             onChange={e => handleFilter(e.target, value.value)}
    //           />
    //           <label htmlFor="">{value.value}({value.count})</label>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="w-20 ms-auto mt-4">
    //       <button
    //         className="w-100 btn text-12 btn-primary py-3"
    //         onClick={submitFilter}
    //       >
    //         Done
    //       </button>
    //     </div>
    //   </div>
    // </Dropdown>
  );
};

export default BuildingTypeFilter;
