import React, { useState } from "react";
import FavouriteIcon from "../../assets/icons/FavouriteIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import Modal from "../modal/Modal";
import SendEmailForm from "../forms/sendEmailForm/SendEmailForm";
import EmailIcon from "../../assets/icons/EmailIcon";
import LogForm from "../forms/logCall/LogForm";
import Button from "../button/Button";
import "./DecisionMakerCard.css";
import DomainVerificationModal from "../DomainVerificationModal";
import { useSelector } from "react-redux";

const sortItems = [
  {
    id: 1,
    key: "last_modified_date",
    value: "updated",
  },
  {
    id: 2,
    key: "created_date",
    value: "newest",
  },
  {
    id: 3,
    key: "bid_due_date",
    value: "Bid due date",
  },
  {
    id: 4,
    key: "sf_size",
    value: "Square Feet",
  },
];

const DecisionMakerCard = ({
  contact,
  emailTemplates,
  templateError,
  emailTemplateBody,
  handleSelectedTemplate,
  callLogHandler,
  handleSendEmail,
  handleEmailContent,
  projectName,
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showLogCallModal, setShowLogCallModal] = useState(false);
  const [selectedSortItem, setSelectedSortItem] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState();

  const handleSelectedSortItem = (itemId) => {
    const item = sortItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
  };

  const selectedTemplateHandler = (templateId) => {
    const template = emailTemplates.find(
      (template) => template.id === templateId
    );
    setSelectedTemplate(template);
    handleSelectedTemplate(template.id, contact);
  };

  const openEmailModalHandler = () => {
    setShowEmailModal(true);
  };

  const closeEmailModalHandler = () => {
    if (emailTemplateBody) {
      emailTemplateBody.subject = "";
      emailTemplateBody.text = "";
      setSelectedTemplate("");
    }
    setShowEmailModal(false);
  };

  const sendEmail = (e, email) => {
    e.preventDefault();
    const subject = projectName;
    const emailBody = "Hi " + contact?.name.split(" ")[0] + ",";
    window.location.href =
      "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
  };

  return (
    <div className="px-2 border border-gray py-4 mt-3 col-md-5 mx-md-3 px-lg-4">
      <div className="d-flex justify-content-between">
        <div className="text-start">
          <h6 className="text-16 fw-bold black-100">{contact.name}</h6>
          <h6 className="black-200 fw-light text-13">
            {contact.title ?? "Other"}
          </h6>
        </div>
        {/*<FavouriteIcon*/}
        {/*  width="20"*/}
        {/*  height="19"*/}
        {/*  fill="#276FB4"*/}
        {/*  className="me-lg-5"*/}
        {/*/>*/}
      </div>
      <div className="my-3">
        <div className="d-flex align-items-center">
          <EmailIcon width="22" height="18" fill="#CCCCCC" className="me-3" />
          <h6
            className="black-200 fw-light text-13 m-0 text-truncate text-primary cursor-pointer"
            onClick={(e) => sendEmail(e, contact.email)}
          >
            {contact.email}
          </h6>
        </div>
      </div>
      <div className="text-13 mt-5 border-top border-bottom py-5">
        <div className="d-flex justify-content-between mb-3">
          <h6 className="text-13 fw-bold black-100">
            Activities on this project
          </h6>
          <h6 className="black-200 fw-light text-13">
            {contact.user_project_activities}
          </h6>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <h6 className="text-13 fw-bold black-100">Last Date</h6>
          <h6 className="black-200 fw-light text-13">
            {contact.last_date &&
              new Date(contact.last_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </h6>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <h6 className="text-13 fw-bold black-100">Total System Activities</h6>
          <h6 className="black-200 fw-light text-13">
            {contact.user_total_system_activities}
          </h6>
        </div>
      </div>

      <div className="justify-content-between mt-5 contact-phone-buttons">
        <Button
          onClick={() => setShowLogCallModal(true)}
          customClassName="btn btn-outline-secondary-intel btn-small text-10 text-truncate contact-phone-button-1"
        >
          <PhoneIcon
            fill="currentColor"
            width="18"
            height="18"
            className="me-2"
          />
          View Phone Details
        </Button>
        <Modal
          title={`${contact.name}’s Phone Details`}
          show={showLogCallModal}
          onCloseModal={() => setShowLogCallModal(false)}
        >
          <LogForm
            phone={contact.phone}
            contactId={contact.id}
            selectedSortItem={selectedSortItem}
            sortItems={sortItems}
            handleSelectedSortItem={handleSelectedSortItem}
            setShowLogCallModal={setShowLogCallModal}
            callLogHandler={callLogHandler}
          />
        </Modal>
        <Button
          onClick={openEmailModalHandler}
          customClassName="text-10 btn btn-primary btn-small contact-phone-button-2"
        >
          Send Email
        </Button>
        <Modal
          title={`New message to ${contact.name}’s`}
          show={showEmailModal}
          onCloseModal={closeEmailModalHandler}
        >
          <SendEmailForm
            selectedTemplate={selectedTemplate}
            templateError={templateError}
            emailTemplates={emailTemplates}
            emailTemplateBody={emailTemplateBody}
            contact={contact}
            handleSelectedTemplate={selectedTemplateHandler}
            handleSendEmail={handleSendEmail}
            handleCloseEmailModal={closeEmailModalHandler}
          />
        </Modal>
      </div>
    </div>
  );
};

export default DecisionMakerCard;
