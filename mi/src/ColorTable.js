import React from "react";
import Pagination from "./Pagination";

function ColorTable({
  colorList,
  updateColorValue,
  setUpdateColorValue,
  updateColor,
  deleteColor,
  searchColor,
  setSearchColor,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const filteredColorList = colorList.filter((val) =>
    val['蛇的顏色'] ? val['蛇的顏色'].toLowerCase().includes(searchColor.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentColors = filteredColorList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="colors">
      <div className="search">
        <input
          type="text"
          placeholder="Search Colors"
          value={searchColor}
          onChange={(event) => setSearchColor(event.target.value)}
        />
      </div>
      <table className="color-table">
        <thead>
          <tr>
            <th>蛇的顏色</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentColors.map((val, key) => (
            <tr key={key}>
              <td>{val['蛇的顏色']}</td>
              <td className="actions">
                <input
                  type="text"
                  placeholder="Value"
                  onChange={(event) => setUpdateColorValue(event.target.value)}
                />
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => updateColor(val['蛇的顏色'], updateColorValue)}
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteColor(val['蛇的顏色'])}
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

export default ColorTable;
