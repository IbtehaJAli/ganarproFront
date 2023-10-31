import React, { useState } from "react";
import { Link } from "react-router-dom";
// import closeIcon from "../../assets/icons/close-search.svg";
// import filterIcon from "../../assets/icons/filter.svg";
import downIcon from "../../assets/icons/down.svg";
import TableCard from "../../components/tableCard/TableCard";
import { recentRecord } from "../../data/recentRecord";
import { recentEngagement } from "../../data/recentEngagement";
import {
  mostEngaged,
  projectInfluencer,
  newlyAdded
} from "../../data/contacts";
import { newWorthy, constructionBid, recentUpdate } from "../../data/projects";
import {
  recentUpdate as companyUpdate,
  recentEmpty,
  emptyData
} from "../../data/company";
import { classNames } from "../../components/helpers/helpers";
import TerritoryDropdown from "./components/TerritoryDropdown";
import { territory } from "../../data/territory";

import "./SalesCloud.css";
import CloseIcon from "../../assets/icons/CloseIcon";
import FilterIcon from "../../assets/icons/FilterIcon";

const SalesCloud = () => {
  const [showTerritoryData, setShowTerritoryData] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState(false);

  const handleOpenTerritoryData = () => {
    setShowTerritoryData(!showTerritoryData);
  };

  const handleSelectedTerritory = territory => {
    setSelectedTerritory(territory);
  };
  return (
    <div className="px-md-5 container-fluid w-95">
      <section className="p-2 container-fluid wrapper__main__notification">
        <div className="d-flex justify-content-between">
          <div className="w-85 text-start">
            <h5 className="mb-3">
              External interaction and relationships are now easier to manage
            </h5>
            <p className="mb-0">
              Using the Projects Board, Territory management, Company discovery,
              and Key contact lists, you can create your target market with
              unlimited access to a complete, open, and unified construction
              customer system of intelligence.
            </p>
          </div>
          <div className="w-15 position-relative">
            {/* <span className="close">
              <img src={closeIcon} alt="close" />
            </span> */}
            <CloseIcon
              width="13"
              height="20"
              fill="#BBBBBB"
              className="close"
            />
          </div>
        </div>
      </section>
      <section className="py-3 ps-4 mt-5 wrapper__main__bar d-flex justify-content-between">
        <div className="">
          <h5 className="title-one">Sales Cloud Home</h5>
        </div>
        <div className="wrapper__main__bar__menu">
          <div className="pe-4 filter d-md-none">
            {/* <span className="">
              <img src={filterIcon} alt="filter" />
            </span> */}
            <FilterIcon
              width="24"
              height="24"
              fill="#000000"
            />
            <span className="text">Filter</span>
            <span className="">
              <img src={downIcon} alt="down" />
            </span>
          </div>

          <ul>
            <li>
              <Link className="active" to="#">
                All Data
              </Link>
            </li>
            <li>
              <Link to="#">Tracking Data</Link>
            </li>
            <li>
              <button
                to="#"
                id="bar-link"
                className="bg-white border-0"
                onClick={handleOpenTerritoryData}
              >
                Territory Data
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 0.5L6 5.5L11 0.5" stroke="#333333" />
                </svg>
              </button>
              <div
                // className="territory"
                className={classNames(
                  "territory text-start",
                  showTerritoryData ? "d-block" : "d-none"
                )}
              >
                <div className="menu-list">
                  <TerritoryDropdown
                    data={territory}
                    setSelected={handleSelectedTerritory}
                    selected={selectedTerritory}
                  />
                  {/* <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Newfoundland</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Northwest Territories</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Nova Scotia</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10">
                      <svg
                        width="16"
                        height="13"
                        viewBox="0 0 16 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33337 6.46152L6.74294 10.906L14.6667 1.33331"
                          stroke="#276FB4"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="ml-2 w-90">Birmingham</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">New Brunswick</div>
                  </Link>
                  <Link className="item active" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Manitoba</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Nunavut</div>
                  </Link>
                  <Link className="item" to="#">
                    <div className="w-10"></div>
                    <div className="ml-2 w-90">Alberta</div>
                  </Link> */}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className="mt-5 wrapper__main__general row">
        <div className="my-2 col-12 col-md-6">
          <TableCard
            cardTitle={recentRecord.title}
            headers={recentRecord.headers}
            cardData={recentRecord.data}
          />
        </div>
        <div className="my-2 col-12 col-md-6">
          <TableCard
            cardTitle={recentEngagement.title}
            headers={recentEngagement.headers}
            cardData={recentEngagement.data}
          />
        </div>
      </section>
      <section className="mt-5 wrapper__main__contacts">
        <div className="row text-start">
          <div className="col">
            <h5 className="section-title">Contacts</h5>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={mostEngaged.title}
              headers={mostEngaged.headers}
              cardData={mostEngaged.data}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={projectInfluencer.title}
              headers={projectInfluencer.headers}
              cardData={projectInfluencer.data}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={newlyAdded.title}
              headers={newlyAdded.headers}
              cardData={newlyAdded.data}
            />
          </div>
        </div>
      </section>

      <section className="mt-5 wrapper__main__products">
        <div className="row text-start">
          <div className="col">
            <h5 className="section-title">Projects</h5>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={newWorthy.title}
              headers={newWorthy.headers}
              cardData={newWorthy.data}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={constructionBid.title}
              headers={constructionBid.headers}
              cardData={constructionBid.data}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={recentUpdate.title}
              headers={recentUpdate.headers}
              cardData={recentUpdate.data}
            />
          </div>
        </div>
      </section>

      <section className="mt-5 wrapper__main__company">
        <div className="row">
          <div className="col">
            <h5 className="section-title text-start">Company</h5>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={companyUpdate.title}
              headers={companyUpdate.headers}
              cardData={companyUpdate.data}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={recentEmpty.title}
              headers={recentEmpty.headers}
              cardData={recentEmpty.data}
              dataType={recentEmpty.type}
            />
          </div>
          <div className="my-2 col-12 col-md-4">
            <TableCard
              cardTitle={emptyData.title}
              headers={emptyData.headers}
              cardData={emptyData.data}
              dataType={emptyData.type}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesCloud;
