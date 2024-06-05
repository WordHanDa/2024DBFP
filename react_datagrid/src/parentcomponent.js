import React, { useState } from 'react';
import SelectLocation from './selectLocation';
import Datagrid from './datagrid';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState({ city: '', district: '', road: '' });

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <SelectLocation handleLocationChange={handleLocationChange} />
      <Datagrid selectedLocation={selectedLocation} />
    </div>
  );
};

export default App;
