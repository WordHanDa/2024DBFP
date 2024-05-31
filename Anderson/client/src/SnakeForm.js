import React, { useState, useEffect } from "react";
import Axios from "axios";

function SnakeForm({ snakeID, snakeName, poison, color, shape, pattern, headShape, antivenomId, url, setSnakeID, setSnakeName, setPoison, setColor, setShape, setPattern, setHeadShape, setAntivenomId, seturl, addSnake }) {
  const [poisonOptions, setPoisonOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [patternOptions, setPatternOptions] = useState([]);
  const [headShapeOptions, setHeadShapeOptions] = useState([]);

  useEffect(() => {
    // Fetch options from backend when component mounts
    Axios.get("http://localhost:3001/poisonLevels")
      .then((response) => {
        setPoisonOptions(response.data.map(poison => poison['蛇的毒性']));
      })
      .catch((error) => {
        console.error('Error fetching poison types:', error);
      });

    Axios.get("http://localhost:3001/snakeColors")
      .then((response) => {
        setColorOptions(response.data.map(color => color['蛇的顏色']));
      })
      .catch((error) => {
        console.error('Error fetching snake colors:', error);
      });

    Axios.get("http://localhost:3001/snakePatterns") 
      .then((response) => {
        setPatternOptions(response.data.map(pattern => pattern['蛇的斑紋']));
      })
      .catch((error) => {
        console.error('Error fetching snake patterns:', error);
      });

    Axios.get("http://localhost:3001/head") 
      .then((response) => {
        setHeadShapeOptions(response.data.map(headShape => headShape['頭部形狀']));
      })
      .catch((error) => {
        console.error('Error fetching snake head shapes:', error);
      });
  }, []);

  return (
    <div className="information">
      <label>Snake_ID:</label>
      <input type="text" value={snakeID} placeholder="請輸入 ID" onChange={(event) => setSnakeID(event.target.value)} />
      
      <label>種類:</label>
      <input type="text" value={snakeName} placeholder="請輸入種類" onChange={(event) => setSnakeName(event.target.value)} />
      
      <label>毒性:</label>
      <select value={poison} onChange={(event) => setPoison(event.target.value)}>
        <option value="">請選擇毒性</option>
        {poisonOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
      <label>出沒時間:</label>
      <select value={shape} onChange={(event) => setShape(event.target.value)}>
        <option value="">請選擇出沒時間</option>
        <option value="日行性">日行性</option>
        <option value="夜行性">夜行性</option>
      </select>
      
      <label>顏色:</label>
      <select value={color} onChange={(event) => setColor(event.target.value)}>
        <option value="">請選擇顏色</option>
        {colorOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
      <label>斑紋:</label>
      <select value={pattern} onChange={(event) => setPattern(event.target.value)}>
        <option value="">請選擇斑紋</option>
        {patternOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
      <label>頭部形狀:</label>
      <select value={headShape} onChange={(event) => setHeadShape(event.target.value)}>
        <option value="">請選擇頭部形狀</option>
        {headShapeOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
      <label>藥品名稱:</label>
      <select value={antivenomId} onChange={(event) => setAntivenomId(event.target.value)}>
        <option value="">請選擇藥品名稱</option>
        <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
        <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
        <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
        <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
      </select>

      <label>圖片URL:</label>
      <input type="text" value={url} placeholder="請輸入圖片URL" onChange={(event) => seturl(event.target.value)} />
      
      <button onClick={addSnake}>Add Snake</button>
    </div>
  );
}

export default SnakeForm;
