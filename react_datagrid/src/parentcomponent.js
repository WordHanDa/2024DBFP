import React, { useState } from 'react';
import MapLocation from './selectLoacation';
import Datagrid from './datagrid';

const ParentComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <MapLocation handleLocationChange={handleLocationChange} />
      {/* Pass selectedLocation to Datagrid */}
      <Datagrid selectedLocation={selectedLocation} />
    </div>
  );
};

export default ParentComponent;