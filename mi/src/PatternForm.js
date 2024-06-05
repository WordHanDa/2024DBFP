// PatternForm.js
import React from "react";

function PatternForm({ patternName, setPatternName, patternURL, setPatternURL, addPattern }) {
  return (
    <div className="information">
      <label>蛇的斑紋:</label>
      <input type="text" placeholder="請輸入斑紋" value={patternName} onChange={(event) => setPatternName(event.target.value)} />
      <label>蛇的斑紋URL:</label>
      <input type="text" placeholder="請輸入URL" value={patternURL} onChange={(event) => setPatternURL(event.target.value)} />
      <button onClick={addPattern}>新增斑紋</button>
    </div>
  );
}

export default PatternForm;
