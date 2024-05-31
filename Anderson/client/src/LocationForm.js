import React from "react";

function LocationForm({LocationHospital, setLocationHospital,LocationAntivenom, setLocationAntivenom,LocationHospitalNumber, setLocationHospitalNumber, addlocation }) {
  return (
    <div className="information">
      <label>醫院名稱:</label>
      <input type="text" value={LocationHospital} onChange={(event) => setLocationHospital(event.target.value)} />
      <label>藥品名稱:</label>
      <input type="text" value={LocationAntivenom} onChange={(event) => setLocationAntivenom(event.target.value)} />
      <label>醫事機構代碼:</label>
      <input type="text" value={LocationHospitalNumber} onChange={(event) => setLocationHospitalNumber(event.target.value)} />
      <button onClick={addlocation}>新增血清存放位置</button>
    </div>
  );
}

export default LocationForm;