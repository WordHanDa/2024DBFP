import React from "react";
import Pagination from "./Pagination";

function HospitalTable({ hospitalList, updateHospitalField, setUpdateHospitalField, updateHospitalValue, setUpdateHospitalValue, updateHospital, deleteHospital, searchHospital, setSearchHospital, currentPage, itemsPerPage, handlePageChange }) {
  const filteredHospitalList = hospitalList.filter((val) => val['醫院名稱'].toLowerCase().includes(searchHospital.toLowerCase()));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHospitals = filteredHospitalList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="hospitals">
      <div className="search">
        <input type="text" placeholder="Search Hospitals" value={searchHospital} onChange={(event) => setSearchHospital(event.target.value)} />
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
              <td>{val['醫事機構代碼']}</td>
              <td>{val['醫院名稱']}</td>
              <td>{val['醫院地址']}</td>
              <td>{val['醫院電話']}</td>
              <td className="actions">
                <select defaultValue="" onChange={(event) => setUpdateHospitalField(event.target.value)}>
                  <option value="" disabled hidden>類別</option>
                  <option value="醫事機構代碼">醫事機構代碼</option>
                  <option value="醫院名稱">醫院名稱</option>
                  <option value="醫院地址">醫院地址</option>
                  <option value="醫院電話">醫院電話</option>
                </select>
                <input type="text" placeholder="Value" onChange={(event) => setUpdateHospitalValue(event.target.value)} />
                <div className="actions-row">
                  <button className="update-button" onClick={() => updateHospital(val['醫事機構代碼'], updateHospitalField, updateHospitalValue)}>更新</button>
                  <button className="delete-button" onClick={() => deleteHospital(val['醫事機構代碼'])}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalItems={filteredHospitalList.length} itemsPerPage={itemsPerPage} handlePageChange={handlePageChange} />
    </div>
  );
}

export default HospitalTable;
