import React, { useState } from 'react';
import dayjs from 'dayjs';
import arrowUp from '../../assets/icons/arrow-up.svg';
import clock from '../../assets/icons/clock.svg';
import { classNames } from '../../components/helpers/helpers';

const ActivityCallCard = ({ logs }) => {
  const [openAccordion, setOpenAccordion] = useState(false);
  const handleSetOpenAccordion = () => {
    setOpenAccordion(!openAccordion);
  };

  const getCallType = (callType) => {
    switch (callType) {
      case 'CA':
        return (
          <div className="text-13 mt-1 text-success text-start">
            Call Answered
          </div>
        );
      case 'NA':
        return (
          <div className="text-13 text-danger mt-1 text-start">No Answer</div>
        );
      case 'VM':
        return (
          <div className="text-13 mt-1 text-warning text-start">Voice Mail</div>
        );
      default:
        break;
    }
  };
  return (
    <div className="my-4">
      <div className="gray-700-bg rounded-pill d-flex justify-content-between py-3 px-2 align-items-center">
        <h6 className="ms-3 mb-0 black-100 text-uppercase">
          {logs ? dayjs(logs[0]?.created).format('MMMM, YYYY') : ''}
        </h6>
        <div
          className="cursor-pointer custom-accordion"
          onClick={handleSetOpenAccordion}
        >
          <img src={arrowUp} alt="email" className="me-3" />
        </div>
      </div>
      {logs?.map((log, index) => (
        <div
          key={index + 1}
          className={classNames(
            'py-4 activity-emails mx-3 custom-panel',
            openAccordion ? 'd-block' : 'd-none'
          )}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold">{log.contact_role?.name}</h6>
            <div className="d-flex w-20 justify-content-end">
              <img src={clock} alt="clock" className="me-1" />
              <p className="text-10 black-300 mb-0 align-self-center">
                {dayjs(log.created).format('MMM. D')}
              </p>
            </div>
          </div>
          <div className="text-13 black-200 text-start">
            {log.contact_role?.phone}
          </div>
          <div className="text-13 black-200 text-start">
            {getCallType(log.activity)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityCallCard;
