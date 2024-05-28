import React from "react";

function HospitalTable({
  hospitalList,
}) {
  return (
    <div className="hospitals">
      <div className="search">
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
          {hospitalList.map((val) => (
            <tr>
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
