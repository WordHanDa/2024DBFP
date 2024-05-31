// HeadShapeTable.js

import React from "react";
import Pagination from "./Pagination";

function HeadShapeTable({
  headShapeList,
  updateHeadShapeValue,
  setUpdateHeadShapeValue,
  updateHeadShape,
  deleteHeadShape,
  searchHeadShape,
  setSearchHeadShape,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const filteredHeadShapeList = headShapeList.filter((val) =>
    val['頭部形狀'] ? val['頭部形狀'].toLowerCase().includes(searchHeadShape.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHeadShapes = filteredHeadShapeList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="headShapes">
      <div className="search">
        <input
          type="text"
          placeholder="Search Head Shapes"
          value={searchHeadShape}
          onChange={(event) => setSearchHeadShape(event.target.value)}
        />
      </div>
      <table className="headShape-table">
        <thead>
          <tr>
            <th>蛇的頭部形狀</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentHeadShapes.map((val, key) => (
            <tr key={key}>
              <td>{val['頭部形狀']}</td>
              <td className="actions">
                <input
                  type="text"
                  placeholder="Value"
                  onChange={(event) => setUpdateHeadShapeValue(event.target.value)}
                />
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => updateHeadShape(val['頭部形狀'], updateHeadShapeValue)}
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteHeadShape(val['頭部形狀'])}
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
        totalItems={filteredHeadShapeList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default HeadShapeTable;
