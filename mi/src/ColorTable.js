import React, { useState } from "react";
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
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSearchChange = (event) => {
    setSearchColor(event.target.value);
    handlePageChange(1); // Reset to the first page on search
  };

  const filteredColorList = colorList.filter((val) =>
    val["蛇的顏色"] ? val["蛇的顏色"].toLowerCase().includes(searchColor.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentColors = filteredColorList.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (event) => {
    setUpdateColorValue(event.target.value);
  };

  return (
    <div className="colors">
      <div className="search">
        <input
          type="text"
          placeholder="Search Colors"
          value={searchColor}
          onChange={handleSearchChange}
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
              <td>{val["蛇的顏色"]}</td>
              <td className="actions">
                <input
                  type="text"
                  placeholder="Value"
                  value={
                    selectedColor && selectedColor === val["蛇的顏色"] ? updateColorValue : ""
                  }
                  onChange={handleInputChange}
                  onFocus={() => {
                    setSelectedColor(val["蛇的顏色"]);
                    setUpdateColorValue(val["蛇的顏色"]);
                  }}
                />
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => updateColor(val["蛇的顏色"], updateColorValue)}
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteColor(val["蛇的顏色"])}
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
