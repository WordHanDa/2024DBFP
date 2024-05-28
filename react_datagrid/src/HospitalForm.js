import React from "react";

function HospitalForm({ hospitalCode, hospitalName, hospitalAddress, hospitalPhone, setHospitalCode, setHospitalName, setHospitalAddress, setHospitalPhone, addHospital }) {
  return (
    <div className="information">
      <label>醫事機構代碼:</label>
      <input type="text" value={hospitalCode} onChange={(event) => setHospitalCode(event.target.value)} />
      <label>醫院名稱:</label>
      <input type="text" value={hospitalName} onChange={(event) => setHospitalName(event.target.value)} />
      <label>醫院地址:</label>
      <input type="text" value={hospitalAddress} onChange={(event) => setHospitalAddress(event.target.value)} />
      <label>醫院電話:</label>
      <input type="text" value={hospitalPhone} onChange={(event) => setHospitalPhone(event.target.value)} />
      <button onClick={addHospital}>Add Hospital</button>
    </div>
  );
}

export default HospitalForm;
