import React, { useState } from "react";
import Pagination from "./Pagination";

function LocationTable({
  LocationList,
  updateLocation,
  deleteLocation,
  searchLocation,
  setSearchLocation,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [updateField, setUpdateField] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const filteredLocationList = LocationList.filter((val) =>
    val['醫院名稱'] ? val['醫院名稱'].toLowerCase().includes(searchLocation.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocationList.slice(indexOfFirstItem, indexOfLastItem);

  const handleUpdateClick = (rowKey, field, value) => {
    updateLocation(rowKey, field, value);
    setSelectedRow(null);
    setUpdateField("");
    setUpdateValue("");
  };

  return (
    <div className="Locations">
      <div className="search">
        <input
          type="text"
          placeholder="Search Locations"
          value={searchLocation}
          onChange={(event) => setSearchLocation(event.target.value)}
        />
      </div>
      <table className="location-table">
        <thead>
          <tr>
            <th>醫院名稱</th>
            <th>藥品名稱</th>
            <th>醫事機構代碼</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLocations.map((val, key) => (
            <tr key={key}>
              <td>{val['醫院名稱']}</td>
              <td>{val['藥品名稱']}</td>
              <td>{val['醫事機構代碼']}</td>
              <td className="actions">
                <select
                  defaultValue=""
                  onChange={(event) => {
                    setSelectedRow(key);
                    setUpdateField(event.target.value);
                  }}
                >
                  <option value="" disabled hidden>類別</option>
                  <option value="醫院名稱">醫院名稱</option>
                  <option value="藥品名稱">藥品名稱</option>
                  <option value="醫事機構代碼">醫事機構代碼</option>
                </select>
                {selectedRow === key && updateField === "藥品名稱" ? (
                  <select
                    onChange={(event) => setUpdateValue(event.target.value)}
                  >
                    <option value="" disabled hidden>選擇藥品名稱</option>
                    <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
                    <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
                    <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
                    <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
                  </select>
                ) : (
                  selectedRow === key && (
                    <input
                      type="text"
                      placeholder="Value"
                      onChange={(event) => setUpdateValue(event.target.value)}
                    />
                  )
                )}
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => handleUpdateClick(val['醫院名稱'], updateField, updateValue)}
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteLocation(val['醫院名稱'], val['藥品名稱'], val['醫事機構代碼'])}
                  >
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
        totalItems={filteredLocationList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default LocationTable;
