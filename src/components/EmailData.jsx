import React, { useEffect, useState } from "react";
import axios from "axios";

const EmailData = () => {
  const [data, setData] = useState([]);
  const [showEmail, setShowEmail] = useState(true);
  const [emailDataForView, setEmailDataForView] = useState([]);
  const [readEmails, setReadEmails] = useState([]);
  
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://emailbox-de186-default-rtdb.firebaseio.com/emailData.json"
      );

      if (response.data) {
        const formattedData = Object.entries(response.data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setData(formattedData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error while getting data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

 
  const handleView = (email) => {
    setShowEmail(false);
    const { id, content, subject, time, to } = email;
    setEmailDataForView([{ id, content, subject, time, to }]);
    setReadEmails((prev) => [...prev, id]); 
  };

  const handleBack = () => {
    setShowEmail(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 text-primary fw-bold">📧 Email Data</h3>

      <ul className="list-group">
        {showEmail ? (
          data.length > 0 ? (
            data.map((item) => {
              const isRead = readEmails.includes(item.id);

              return (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm"
                  style={{
                    backgroundColor: isRead ? "#f8f9fa" : "#e7f0ff", 
                   
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!isRead} 
                    readOnly
                    style={{
                      accentColor: "blue",
                     
                      width: "18px",
                      height: "18px",
                      marginRight: "10px",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <p
                      className="mb-1 fw-bold"
                      style={{
                        color: isRead ? "gray" : "black",
                       
                      }}
                    >
                      {item.subject}
                    </p>
                    <small>{item.to}</small>
                  </div>

                  <span className="text-muted">{item.time}</span>

                  <button
                    className="btn btn-link text-primary"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </li>
              );
            })
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "30vh" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )
        ) : (
   
          <React.Fragment>
            {emailDataForView.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              >
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  {item.to.split("")[0].toUpperCase()}
                </button>

                <h4>📧 {item.subject}</h4>
                <h6>To: {item.to}</h6>
                <p>{item.content}</p>
                <small>{item.time}</small>

                <div className="mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={handleBack}
                  >
                    ⬅ Go Back
                  </button>
                </div>
              </div>
            ))}
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default EmailData;

