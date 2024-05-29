import React, { useState } from 'react';
import SelectLocation from './selectLocation';
import Datagrid from './datagrid';

const ParentComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return(
    <div>
      <SelectLocation handleLocationChange={handleLocationChange} />
      <Datagrid selectedLocation={selectedLocation}/>
    </div>
  );
};

export default ParentComponent;
