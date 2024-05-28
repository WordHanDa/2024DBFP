import React from "react";
import Pagination from "./Pagination";

function SnakeTable({ snakeList, updateField, setUpdateField, updateValue, setUpdateValue, updateSnake, deleteSnake, searchSnake, setSearchSnake, currentPage, itemsPerPage, handlePageChange }) {
  const filteredSnakeList = snakeList.filter((val) => val.種類.toLowerCase().includes(searchSnake.toLowerCase()));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSnakes = filteredSnakeList.slice(indexOfFirstItem, indexOfLastItem);

  const renderInputField = () => {
    switch (updateField) {
      case "毒性":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="無毒">無毒</option>
            <option value="強">強</option>
            <option value="弱">弱</option>
          </select>
        );
      case "出沒時間":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="日行性">日行性</option>
            <option value="夜行性">夜行性</option>
          </select>
        );
      case "顏色":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="紅色">紅色</option>
            <option value="黃色">黃色</option>
            <option value="綠色">綠色</option>
            <option value="褐色">褐色</option>
          </select>
        );
      case "斑紋":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="環狀">環狀</option>
            <option value="V字">V字</option>
          </select>
        );
      case "頭部形狀":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="橢圓形">橢圓形</option>
            <option value="三角形">三角形</option>
          </select>
        );
      case "Antivenom_ID":
        return (
          <select onChange={(event) => setUpdateValue(event.target.value)}>
            <option value="">無</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        );
      default:
        return <input type="text" placeholder="Value" onChange={(event) => setUpdateValue(event.target.value)} />;
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