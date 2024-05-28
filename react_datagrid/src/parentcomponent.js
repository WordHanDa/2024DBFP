import React, { useState } from 'react';
import SelectLocation from './selectLocation';
import Datagrid from './datagrid';

const ParentComponent = ({ hospitalList }) => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <SelectLocation handleLocationChange={handleLocationChange} />
      <Datagrid 
        hospitalList={hospitalList}
        selectedLocation={selectedLocation} 
      />
    </div>
  );
};

export default ParentComponent;
