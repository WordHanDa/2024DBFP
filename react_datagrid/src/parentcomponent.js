import React, { useState } from 'react';
import SelectLocation from './selectLocation';
import Datagrid from './datagrid';

const ParentComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const hospitalList = [
    { id: 1, 醫院名稱: '臺北市立聯合醫院', 醫院電話: '25553000', 醫事機構代碼: '101090517', 醫院地址: '台北市大同區鄭州路１４５號' },
    // Add more hospital data here if needed
  ];

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <SelectLocation handleLocationChange={handleLocationChange} />
      <Datagrid hospitalList={hospitalList} selectedLocation={selectedLocation} />
    </div>
  );
};

export default ParentComponent;
