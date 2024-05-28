import React from "react";

function SnakeTable({
  snakeList,
}) {

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
          {snakeList.map((val) => (
            <tr>
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
