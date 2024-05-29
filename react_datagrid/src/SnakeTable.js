import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function SnakeTable() {
  const [snakeList, setSnakeList] = useState([]);

  // Function to fetch snake data from the server
  const getSnakes = () => {
    Axios.get("http://localhost:3001/snakes")
      .then((response) => {
        setSnakeList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching snake data:', error);
      });
  };

  // Fetch snake data when the component mounts
  useEffect(() => {
    getSnakes();
  }, []);

  return (
    <div className="snakes">
      <table className="snake-table">
        <thead>
          <tr>
            <th>Snake_ID</th>
            <th>種類</th>
            <th>毒性</th>
            <th>出沒時間</th>
            <th>顏色</th>
            <th>斑紋</th>
            <th>頭部形狀</th>
            <th>Antivenom ID</th>
          </tr>
        </thead>
        <tbody>
          {snakeList.map((val, index) => (
            <tr key={index}>
              <td>{val.Snake_ID}</td>
              <td>{val.種類}</td>
              <td>{val.毒性}</td>
              <td>{val.出沒時間}</td>
              <td>{val.顏色}</td>
              <td>{val.斑紋}</td>
              <td>{val.頭部形狀}</td>
              <td>{val.Antivenom_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SnakeTable;
