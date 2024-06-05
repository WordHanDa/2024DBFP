import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "./Pagination";

function SnakeTable({ snakeList, updateField, setUpdateField, updateValue, setUpdateValue, updateSnake, deleteSnake, searchSnake, setSearchSnake, currentPage, itemsPerPage, handlePageChange }) {
  const [poisonOptions, setPoisonOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [patternOptions, setPatternOptions] = useState([]);
  const [headShapeOptions, setHeadShapeOptions] = useState([]);

  useEffect(() => {
    // Fetch poison options from backend when component mounts
    Axios.get("http://localhost:3001/poisonLevels")
      .then((response) => {
        setPoisonOptions(response.data.map(poison => poison['蛇的毒性']));
      })
      .catch((error) => {
        console.error('Error fetching poison types:', error);
      });

    // Fetch color options from backend when component mounts
    Axios.get("http://localhost:3001/snakeColors")
      .then((response) => {
        setColorOptions(response.data.map(color => color['蛇的顏色']));
      })
      .catch((error) => {
        console.error('Error fetching color options:', error);
      });

    // Fetch pattern options from backend when component mounts
    Axios.get("http://localhost:3001/snakePatterns")
      .then((response) => {
        setPatternOptions(response.data.map(pattern => pattern['蛇的斑紋']));
      })
      .catch((error) => {
        console.error('Error fetching pattern options:', error);
      });

    // Fetch head shape options from backend when component mounts
    Axios.get("http://localhost:3001/head")
      .then((response) => {
        setHeadShapeOptions(response.data.map(headShape => headShape['頭部形狀']));
      })
      .catch((error) => {
        console.error('Error fetching head shape options:', error);
      });
  }, []);

  const filteredSnakeList = snakeList.filter((val) => val.種類.toLowerCase().includes(searchSnake.toLowerCase()));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSnakes = filteredSnakeList.slice(indexOfFirstItem, indexOfLastItem);

  const renderInputField = () => {
    switch (updateField) {
      case "毒性":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            {poisonOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case "出沒時間":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="日行性">日行性</option>
            <option value="夜行性">夜行性</option>
          </select>
        );
      case "顏色":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            {colorOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case "斑紋":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            {patternOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case "頭部形狀":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            {headShapeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case "Antivenom_ID":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="">無</option>
            <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
            <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
            <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
            <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
          </select>
        );
      default:
        return <input type="text" placeholder="Value" value={updateValue} onChange={(event) => setUpdateValue(event.target.value)} />;
    }
  };

  return (
    <div className="snakes">
      <div className="search">
        <input type="text" placeholder="Search Snakes" value={searchSnake} onChange={(event) => setSearchSnake(event.target.value)} />
      </div>
      
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSnakes.map((val, key) => (
            <tr key={key}>
              <td>{val.Snake_ID}</td>
              <td>{val.種類}</td>
              <td>{val.毒性}</td>
              <td>{val.出沒時間}</td>
              <td>{val.顏色}</td>
              <td>{val.斑紋}</td>
              <td>{val.頭部形狀}</td>
              <td>{val.Antivenom_ID}</td>
              <td className="actions">
                <select defaultValue="" onChange={(event) => setUpdateField(event.target.value)}>
                  <option value="" disabled hidden>類別</option>
                  <option value="種類">種類</option>
                  <option value="毒性">毒性</option>
                  <option value="出沒時間">出沒時間</option>
                  <option value="顏色">顏色</option>
                  <option value="斑紋">斑紋</option>
                  <option value="頭部形狀">頭部形狀</option>
                  <option value="Antivenom_ID">Antivenom ID</option>
                </select>
                {renderInputField()}
                <div className="actions-row">
                  <button className="update-button" onClick={() => updateSnake(val.Snake_ID, updateField, updateValue)}>更新</button>
                  <button className="delete-button" onClick={() => deleteSnake(val.Snake_ID)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalItems={filteredSnakeList.length} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange} />
    </div>
  );
}

export default SnakeTable;