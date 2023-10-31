import AttachmentIcon from "../../../assets/icons/AttachmentIcon";
import SelectInput from "../../input/SelectInput";
import Button from "../../../components/button/Button";
import EmailEditor from "../../quill/EmailEditor";
import { useEffect, useState } from "react";

const SendEmailForm = ({
  selectedTemplate,
  emailTemplates,
  templateError,
  emailTemplateBody,
  contact,
  handleSelectedTemplate,
  handleSendEmail,
  handleCloseEmailModal,
}) => {
  const [emailContent, setEmailContent] = useState("");
  const [subjectContent, setSubjectContent] = useState("");

  const reformatEmailText = (string) => {
    const splitedString = string?.split("\r\n");
    const newString = splitedString?.map((string) => `<p>${string}<br></p>`);
    return newString?.join("");
  };

  const emailContentHandler = (content) => {
    setEmailContent(content);
  };

  useEffect(() => {
    setSubjectContent(emailTemplateBody?.subject);
  }, [emailTemplateBody]);

  const subjectChangeHandler = (e) => {
    setSubjectContent(e.target.value);
  };
  return (
    <div>
      <div className="">
        <SelectInput
          placeHolder="Select a template"
          selectedItem={selectedTemplate?.name}
        >
          {emailTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectedTemplate(template.id)}
              className="cursor-pointer select-input-item py-2 ps-4"
            >
              {template.name}
            </div>
          ))}
        </SelectInput>
        <div className="text-start text-danger text-10">
          {templateError ? templateError : ""}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="form-control py-2"
          value={subjectContent || ""}
          onChange={subjectChangeHandler}
        />
      </div>
      <div className="mt-5">
        <EmailEditor
          emailBody={reformatEmailText(emailTemplateBody?.text)}
          handleEmailContent={emailContentHandler}
        />
      </div>
      <div className="d-flex justify-content-between">
        <Button customClassName="btn btn-outline-secondary-intel btn-small py-2 mt-3 px-3 ">
          <AttachmentIcon
            fill="currentColor"
            className="me-2"
            width="12"
            height="18"
          />
          Attach Files
        </Button>
        <Button
          onClick={() =>
            handleSendEmail(
              contact,
              selectedTemplate,
              subjectContent,
              emailContent,
              handleCloseEmailModal
            )
          }
          customClassName="btn btn-primary btn-small py-2 mt-3 px-3 text-white"
        >
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default SendEmailForm;
