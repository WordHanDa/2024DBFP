import React from "react";
import Pagination from "./Pagination";

function LocationTable({
  LocationList,
  updateLocationField,
  setUpdateLocationField,
  updateLocationValue,
  setUpdateLocationValue,
  updateLocation,
  deleteLocation,
  searchLocation,
  setSearchLocation,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const filteredColorList = LocationList.filter((val) =>
    val['醫院名稱'] ? val['醫院名稱'].toLowerCase().includes(searchLocation.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredColorList.slice(indexOfFirstItem, indexOfLastItem);

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
                  onChange={(event) => setUpdateLocationField(event.target.value)}
                >
                  <option value="" disabled hidden>類別</option>
                  <option value="醫院名稱">醫院名稱</option>
                  <option value="藥品名稱">藥品名稱</option>
                  <option value="醫事機構代碼">醫事機構代碼</option>
                </select>
                {updateLocationField === "藥品名稱" ? (
                  <select
                    onChange={(event) => setUpdateLocationValue(event.target.value)}
                  >
                    <option value="" disabled hidden>選擇藥品名稱</option>
                    <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
                    <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
                    <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
                    <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Value"
                    onChange={(event) => setUpdateLocationValue(event.target.value)}
                  />
                )}
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => updateLocation(val['醫院名稱'], val['藥品名稱'], val['醫事機構代碼'], updateLocationField, updateLocationValue)}
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
        totalItems={filteredColorList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default LocationTable;
