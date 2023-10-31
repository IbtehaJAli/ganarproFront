import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [["bold", "italic", "underline"]],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
// const formats = ['bold', 'italic', 'underline'];
const EmailEditor = ({ placeholder, emailBody, handleEmailContent }) => {
  const [editorHtml, setEditorHtml] = useState("");
  useEffect(() => {
    setEditorHtml(emailBody);
  }, [emailBody]);

  const handleChange = (html) => {
    setEditorHtml(html);
    handleEmailContent(html);
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={editorHtml || ""}
        // modules={modules}
        // formats={formats}
        bounds={".app"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default EmailEditor;
