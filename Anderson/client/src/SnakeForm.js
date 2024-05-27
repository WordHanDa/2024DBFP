import React from "react";

function SnakeForm({ snakeID, snakeName, poison, color, shape, pattern, headShape, antivenomId, setSnakeID, setSnakeName, setPoison, setColor, setShape, setPattern, setHeadShape, setAntivenomId, addSnake }) {
  return (
    <div className="information">
      <label>Snake_ID:</label>
      <input type="text" value={snakeID} onChange={(event) => setSnakeID(event.target.value)} />
      <label>種類:</label>
      <input type="text" value={snakeName} onChange={(event) => setSnakeName(event.target.value)} />
      <label>毒性:</label>
      <select value={poison} onChange={(event) => setPoison(event.target.value)}>
        <option value="無毒">無毒</option>
        <option value="強">強</option>
        <option value="弱">弱</option>
      </select>
      <label>出沒時間:</label>
      <select value={shape} onChange={(event) => setShape(event.target.value)}>
        <option value="日行性">日行性</option>
        <option value="夜行性">夜行性</option>
      </select>
      <label>顏色:</label>
      <select value={color} onChange={(event) => setColor(event.target.value)}>
        <option value="紅色">紅色</option>
        <option value="黃色">黃色</option>
        <option value="綠色">綠色</option>
        <option value="褐色">褐色</option>
      </select>
      <label>斑紋:</label>
      <select value={pattern} onChange={(event) => setPattern(event.target.value)}>
        <option value="環狀">環狀</option>
        <option value="V字">V字</option>
      </select>
      <label>頭部形狀:</label>
      <select value={headShape} onChange={(event) => setHeadShape(event.target.value)}>
        <option value="橢圓形">橢圓形</option>
        <option value="三角形">三角形</option>
      </select>
      <label>Antivenom ID:</label>
      <select value={antivenomId} onChange={(event) => setAntivenomId(event.target.value)}>
        <option value="">無</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={addSnake}>Add Snake</button>
    </div>
  );
}

export default SnakeForm;