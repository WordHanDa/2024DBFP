// HeadShapeForm.js

import React from "react";

function HeadShapeForm({ headShapeName, setHeadShapeName, addHeadShape }) {
  return (
    <div className="information">
      <label>蛇的頭部形狀:</label>
      <input
        type="text"
        value={headShapeName}
        onChange={(event) => setHeadShapeName(event.target.value)}
      />
      <button onClick={addHeadShape}>新增頭部形狀</button>
    </div>
  );
}

export default HeadShapeForm;
