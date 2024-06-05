import React from "react";

function LocationForm({
  LocationHospital,
  setLocationHospital,
  LocationAntivenom,
  setLocationAntivenom,
  LocationHospitalNumber,
  setLocationHospitalNumber,
  addLocation,
}) {
  return (
    <div className="information">
      <label>醫院名稱:</label>
      <input
        type="text"
        placeholder="請輸入醫院名稱"
        value={LocationHospital}
        onChange={(event) => setLocationHospital(event.target.value)}
      />
      <label>藥品名稱:</label>
      <select
        value={LocationAntivenom}
        onChange={(event) => setLocationAntivenom(event.target.value)}
      >
        <option value="">請選擇藥品名稱</option>
        <option value="抗百步蛇毒血清">抗百步蛇毒血清</option>
        <option value="抗鎖鏈蛇毒血清">抗鎖鏈蛇毒血清</option>
        <option value="抗雨傘節及飯匙倩蛇毒血清">抗雨傘節及飯匙倩蛇毒血清</option>
        <option value="抗龜殼花及赤尾鮐蛇毒血清">抗龜殼花及赤尾鮐蛇毒血清</option>
      </select>
      <label>醫事機構代碼:</label>
      <input
        type="text"
        placeholder="請輸入醫事機構代碼"
        value={LocationHospitalNumber}
        onChange={(event) => setLocationHospitalNumber(event.target.value)}
      />
      <button onClick={addLocation}>新增血清存放位置</button>
    </div>
  );
}

export default LocationForm;
