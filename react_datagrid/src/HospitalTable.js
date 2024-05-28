import React from "react";

function HospitalTable({
  hospitalList,
  searchHospital,
  setSearchHospital
}) {
  const filteredHospitalList = hospitalList.filter((val) =>
    val['醫院名稱'].toLowerCase().includes(searchHospital.toLowerCase())
  );
  return (
    <div className="hospitals">
      <div className="search">
        <input
          type="text"
          placeholder="Search Hospitals"
          value={searchHospital}
          onChange={(event) => setSearchHospital(event.target.value)}
        />
      </div>
      <table className="hospital-table">
        <thead>
          <tr>
            <th>醫事機構代碼</th>
            <th>醫院名稱</th>
            <th>醫院地址</th>
            <th>醫院電話</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitalList.map((val, key) => (
            <tr key={key}>
              <td>{val['醫事機構代碼']}</td>
              <td>{val['醫院名稱']}</td>
              <td>{val['醫院地址']}</td>
              <td>{val['醫院電話']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HospitalTable;
