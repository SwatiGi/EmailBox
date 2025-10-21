import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

const EmailComposer = () => {
  const [isCompose,setIsCompose] = useState(false)
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
let time = new Date();
let currentTime = time.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});

  const handleSend = async () => {
    try {
     
      const content = convertToRaw(editorState.getCurrentContent()).blocks[0];
      console.log(content)
      let res = await axios.post(
        "https://emailbox-de186-default-rtdb.firebaseio.com/emailData.json",
        { to, subject,content: content.text,time:currentTime  }
      );
        if (!to && !subject && !content) {
          alert("Please fill all field")
          return;
        }

      
      alert("Email sent successfully!");
    } catch (error) {
      console.log("Error while posting:", error);
    }
  };

  return (
    <div className="container m-2" style={{ maxWidth: "800px" }}>
      {!isCompose ? <button className="btn btn-primary px-4" onClick={()=>setIsCompose(!isCompose)}>Compose</button>:  <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Compose Email</h5>
        </div>

        <div className="card-body">
          
          <div className="mb-3">
            <label className="form-label fw-semibold">To</label>
            <input
              required
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
              required
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
                required
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

        
          <div className="text-end mt-3 d-flex justify-content-between">
            <button className="btn mx-2 btn-primary px-4" onClick={()=>setIsCompose(!isCompose)}>
              Go back
            </button>
            <button className="btn btn-primary px-4" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>}
      
    
    </div>
  );
};

export default EmailComposer;
