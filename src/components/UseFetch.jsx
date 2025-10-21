import React, { useEffect, useState } from 'react'
import axios from "axios"
const useFetch = (url) => {
    let [data, setData] = useState([])
     let fetch = async() => {
        try {
            let response = await axios.get(url)
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
            console.log("Error while fetching",error)
        }
        }
    useEffect(() => {
       
        fetch()
    }, [url])
  
  return data
}

export default useFetch