// import Dropdown from "../../../components/dropdown/Dropdown";

import { Dropdown, DropdownButton } from "react-bootstrap";

const ProjectListFilter = ({
  title,
  filters,
  filterData,
  placeHolder,
  handleSelectAll,
  handleFilter,
  submitFilter,
}) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      size="lg"
      title={placeHolder}
      autoClose="outside"
    >
      <Dropdown.Item href="#/action-2" className="boardlist-nav-drop bg-white">
        <div className="mb-5 text-12 col-md-12">
          <div className="mb-4 d-flex">
            <input
              type="checkbox"
              className="me-3"
              onChange={(e) => handleSelectAll(e, filters.key)}
            />
            <label htmlFor="" className="text-dark fs-5">
              Select All
            </label>
          </div>
          <div>
            {filterData?.map((value, index) => (
              <div key={index + 1} className="mb-4 d-flex">
                <input
                  type="checkbox"
                  className={`me-3 ${filters.key}`}
                  name={placeHolder}
                  onChange={(e) => handleFilter(e.target, value.value)}
                />
                <label htmlFor="" className="text-dark fs-5">
                  {value.name}({value.count})
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
    // <Dropdown size="lg" className="menu-trigger">
    //
    //   <Dropdown.Toggle variant="primary" id="dropdown-basic">
    //     {placeHolder}
    //   </Dropdown.Toggle>
    //
    //   <Dropdown.Menu className="black-100 text-start px-4 py-5">
    //     <div className="mb-5 text-12">
    //       <div className="mb-4">
    //         <input
    //           type="checkbox"
    //           className="me-3"
    //           onChange={(e) => handleSelectAll(e, filters.key)}
    //         />
    //         <label htmlFor="">Select All</label>
    //       </div>
    //       <div>
    //         {filterData?.map((value, index) => (
    //           <div key={index + 1} className="mb-4">
    //             <input
    //               type="checkbox"
    //               className={`me-3 ${filters.key}`}
    //               name={placeHolder}
    //               onChange={(e) => handleFilter(e.target, value.value)}
    //             />
    //             <label htmlFor="">
    //               {value.name}({value.count})
    //             </label>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="w-100 mt-4">
    //       <button
    //         className="w-100 btn text-12 btn-primary py-3"
    //         onClick={submitFilter}
    //       >
    //         Done
    //       </button>
    //     </div>
    //   </Dropdown.Menu>
    // </Dropdown>
    // <Dropdown title={title} customClassName="boardlist-nav-drop">
    //   <div className="black-100 text-start px-4 py-5">
    //     <p className="mb-4 fw-bold text-13">{placeHolder}</p>
    //     <div className="mb-5 text-12">
    //       <div className="mb-4">
    //         <input
    //           type="checkbox"
    //           className="me-3"
    //           onChange={e => handleSelectAll(e, filters.key)}
    //         />
    //         <label htmlFor="">Select All</label>
    //       </div>
    //       <div>
    //         {filterData?.map((value, index) => (
    //           <div key={index + 1} className="mb-4">
    //             <input
    //               type="checkbox"
    //               className={`me-3 ${filters.key}`}
    //               name={placeHolder}
    //               onChange={e => handleFilter(e.target, value.value)}
    //             />
    //             <label htmlFor="">{value.name}({value.count})</label>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="w-100 mt-4">
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

export default ProjectListFilter;
