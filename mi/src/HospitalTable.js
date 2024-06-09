import React, { useState } from "react";
import Pagination from "./Pagination";

function HospitalTable({
  hospitalList,
  updateHospitalField,
  setUpdateHospitalField,
  updateHospitalValue,
  setUpdateHospitalValue,
  updateHospital,
  deleteHospital,
  searchHospital,
  setSearchHospital,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleSearchChange = (event) => {
    setSearchHospital(event.target.value);
    handlePageChange(1); // Reset to the first page on search
  };

  const handleFieldChange = (event, val) => {
    const field = event.target.value;
    setUpdateHospitalField(field);
    setUpdateHospitalValue(val[field]);
    setSelectedHospital(val);
  };

  const filteredHospitalList = hospitalList.filter((val) =>
    val["醫院名稱"].toLowerCase().includes(searchHospital.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitalList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="hospitals">
      <div className="search">
        <input
          type="text"
          placeholder="Search Hospitals"
          value={searchHospital}
          onChange={handleSearchChange}
        />
      </div>
      <table className="hospital-table">
        <thead>
          <tr>
            <th>醫事機構代碼</th>
            <th>醫院名稱</th>
            <th>醫院地址</th>
            <th>醫院電話</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentHospitals.map((val, key) => (
            <tr key={key}>
              <td>{val["醫事機構代碼"]}</td>
              <td>{val["醫院名稱"]}</td>
              <td>{val["醫院地址"]}</td>
              <td>{val["醫院電話"]}</td>
              <td className="actions">
                <select
                  value={selectedHospital && selectedHospital["醫事機構代碼"] === val["醫事機構代碼"] ? updateHospitalField : ""}
                  onChange={(event) => handleFieldChange(event, val)}
                >
                  <option value="" disabled hidden>
                    類別
                  </option>
                  <option value="醫事機構代碼">醫事機構代碼</option>
                  <option value="醫院名稱">醫院名稱</option>
                  <option value="醫院地址">醫院地址</option>
                  <option value="醫院電話">醫院電話</option>
                </select>
                <input
                  type="text"
                  placeholder="Value"
                  value={selectedHospital && selectedHospital["醫事機構代碼"] === val["醫事機構代碼"] ? updateHospitalValue : ""}
                  onChange={(event) => setUpdateHospitalValue(event.target.value)}
                />
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() =>
                      updateHospital(val["醫事機構代碼"], updateHospitalField, updateHospitalValue)
                    }
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteHospital(val["醫事機構代碼"], val["醫院名稱"])}
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
        totalItems={filteredHospitalList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default HospitalTable;
