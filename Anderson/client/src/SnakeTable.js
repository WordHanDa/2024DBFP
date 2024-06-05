import React, { useState, useEffect } from "react";
import Axios from "axios";
import Pagination from "./Pagination";

const SERVER_ADDRESS = "http://172.27.6.192:3001";

function SnakeTable({
  snakeList,
  updateSnake,
  deleteSnake,
  searchSnake,
  setSearchSnake,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const [poisonOptions, setPoisonOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [patternOptions, setPatternOptions] = useState([]);
  const [headShapeOptions, setHeadShapeOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updateField, setUpdateField] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  useEffect(() => {
    Axios.get(`${SERVER_ADDRESS}/poisonLevels`)
      .then((response) => {
        setPoisonOptions(response.data.map((poison) => poison["蛇的毒性"]));
      })
      .catch((error) => {
        console.error("Error fetching poison types:", error);
      });

    Axios.get(`${SERVER_ADDRESS}/snakeColors`)
      .then((response) => {
        setColorOptions(response.data.map((color) => color["蛇的顏色"]));
      })
      .catch((error) => {
        console.error("Error fetching color options:", error);
      });

    Axios.get(`${SERVER_ADDRESS}/snakePatterns`)
      .then((response) => {
        setPatternOptions(response.data.map((pattern) => pattern["蛇的斑紋"]));
      })
      .catch((error) => {
        console.error("Error fetching pattern options:", error);
      });

    Axios.get(`${SERVER_ADDRESS}/head`)
      .then((response) => {
        setHeadShapeOptions(response.data.map((headShape) => headShape["頭部形狀"]));
      })
      .catch((error) => {
        console.error("Error fetching head shape options:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchSnake(event.target.value);
    handlePageChange(1); // Reset to the first page on search
  };

  const filteredSnakeList = snakeList.filter((val) =>
    val.種類.toLowerCase().includes(searchSnake.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSnakes = filteredSnakeList.slice(indexOfFirstItem, indexOfLastItem);

  const handleUpdateClick = (snakeId, field, value) => {
    // 如果值是空字符串，將其設置為 null
    if (value === "") {
      value = null;
    }
    updateSnake(snakeId, field, value);
    setSelectedRow(null);
    setUpdateField("");
    setUpdateValue("");
  };

  const renderInputField = () => {
    switch (updateField) {
      case "毒性":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            {poisonOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "出沒時間":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            <option value="日行性">日行性</option>
            <option value="夜行性">夜行性</option>
          </select>
        );
      case "顏色":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            {colorOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "斑紋":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            {patternOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "頭部形狀":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            {headShapeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "藥品名稱":
        return (
          <select value={updateValue} onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="" disabled hidden>
              請選擇
            </option>
            <option value={null}></option> 
            <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
            <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
            <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
            <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Value"
            value={updateValue}
            onChange={(event) => setUpdateValue(event.target.value)}
          />
        );
    }
  };

  return (
    <div className="snakes">
      <div className="search">
        <input
          type="text"
          placeholder="Search Snakes"
          value={searchSnake}
          onChange={handleSearchChange}
        />
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
            <th>藥品名稱</th>
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
              <td>{val.藥品名稱 || "N/A"}</td> {/* Handle null values */}
              <td className="actions">
                <select
                  defaultValue=""
                  onChange={(event) => {
                    setSelectedRow(key);
                    setUpdateField(event.target.value);
                  }}
                >
                  <option value="" disabled hidden>
                    類別
                  </option>
                  <option value="種類">種類</option>
                  <option value="毒性">毒性</option>
                  <option value="出沒時間">出沒時間</option>
                  <option value="顏色">顏色</option>
                  <option value="斑紋">斑紋</option>
                  <option value="頭部形狀">頭部形狀</option>
                  <option value="藥品名稱">藥品名稱</option>
                </select>
                {selectedRow === key && renderInputField()}
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => handleUpdateClick(val.Snake_ID, updateField, updateValue)}
                  >
                    更新
                  </button>
                  <button className="delete-button" onClick={() => deleteSnake(val.Snake_ID)}>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredSnakeList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default SnakeTable;
