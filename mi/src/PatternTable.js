// PatternTable.js
import React from "react";
import Pagination from "./Pagination";

function PatternTable({
  patternList,
  updatePatternValue,
  setUpdatePatternValue,
  updatePattern,
  deletePattern,
  searchPattern,
  setSearchPattern,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) {
  const filteredPatternList = patternList.filter((val) =>
    val['蛇的斑紋'] ? val['蛇的斑紋'].toLowerCase().includes(searchPattern.toLowerCase()) : false
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatterns = filteredPatternList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="patterns">
      <div className="search">
        <input
          type="text"
          placeholder="Search Patterns"
          value={searchPattern}
          onChange={(event) => setSearchPattern(event.target.value)}
        />
      </div>
      <table className="pattern-table">
        <thead>
          <tr>
            <th>蛇的斑紋</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatterns.map((val, key) => (
            <tr key={key}>
              <td>{val['蛇的斑紋']}</td>
              <td className="actions">
                <input
                  type="text"
                  placeholder="Value"
                  onChange={(event) => setUpdatePatternValue(event.target.value)}
                />
                <div className="actions-row">
                  <button
                    className="update-button"
                    onClick={() => updatePattern(val['蛇的斑紋'], updatePatternValue)}
                  >
                    更新
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deletePattern(val['蛇的斑紋'])}
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
        totalItems={filteredPatternList.length}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default PatternTable;
