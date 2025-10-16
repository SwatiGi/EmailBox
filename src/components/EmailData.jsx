import React, { useEffect, useState } from "react";
import axios from "axios";

const EmailData = () => {
  const [data, setData] = useState([]);

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
  console.log("data", formattedData);
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

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 text-primary fw-bold">📧 Email Data</h3>

      <ul className="list-group">
        {data.length > 0 ? (
          data.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-start mb-2 shadow-sm"
              >
                  <input type="checkbox" className="mt-2" name="" id="" />
                  <p>{item.subject}</p>
                <span className="">
                  {item.to}
                </span>
              <div>
               
                
              </div>
              <span className="text-primary">{item.time}</span>
            </li>
          ))
        ) : (
         <div className="d-flex justify-content-center align-items-center" style={{height: "30vh"}}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

        )}
      </ul>
    </div>
  );
};

export default EmailData;
