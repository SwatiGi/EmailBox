import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const EmailComposer = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSend = async () => {
    try {
     
      const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

      let res = await axios.post(
        "https://emailbox-de186-default-rtdb.firebaseio.com/emailData.json",
        { to, subject, content }
      );

      console.log("Response:", res.data);
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Body:", content);
      alert("Email sent successfully!");
    } catch (error) {
      console.log("Error while posting:", error);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Compose Email</h5>
        </div>

        <div className="card-body">
          
          <div className="mb-3">
            <label className="form-label fw-semibold">To</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter recipient email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

        
          <div className="mb-3">
            <label className="form-label fw-semibold">Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

         
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <div
              className="border rounded p-2"
              style={{ minHeight: "300px", backgroundColor: "#fff" }}
            >
             
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "link",
                    "history",
                  ],
                }}
                editorStyle={{ minHeight: "200px", padding: "10px" }}
              />
            </div>
          </div>

        
          <div className="text-end mt-3">
            <button className="btn btn-primary px-4" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;
