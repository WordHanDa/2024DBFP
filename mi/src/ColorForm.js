import React from "react";

function ColorForm({ colorName, setColorName, addColor }) {
  return (
    <div className="information">
      <label>蛇的顏色:</label>
      <input type="text" placeholder="請輸入顔色" value={colorName} onChange={(event) => setColorName(event.target.value)} />
      <button onClick={addColor}>新增顏色</button>
    </div>
  );
}

export default ColorForm;
