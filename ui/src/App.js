import './App.css';
import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter';
import SerumMapHeader from './pheader';
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import SelectLocation from './selectLocation';
import Datagrid from './datagrid';
import React, { useState, useRef } from 'react';

const SERVER_ADDRESS = "http://172.27.6.192:3001";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState({ city: '', district: '', road: '', serum: '' });
  const [selectedSerum, setSelectedSerum] = useState('');
  const selectLocationRef = useRef(null);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleImageClick = (serum) => {
    setSelectedSerum(serum);
    setSelectedLocation(prevLocation => ({ ...prevLocation, serum }));
    selectLocationRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div>
        <SerumMapHeader />
      </div>
      <div>
        <SeurmMapTitle />
      </div>
      <div>
        <SnakeFeature />
      </div>
      <div className="containerStyle">
        <ImageListWithTitle onImageClick={handleImageClick} SERVER_ADDRESS={SERVER_ADDRESS} />
      </div>
      <div ref={selectLocationRef}> {/* Attach the ref here */}
        <SelectLocation selectedSerum={selectedSerum} handleLocationChange={handleLocationChange} SERVER_ADDRESS={SERVER_ADDRESS}/>
      </div>
      <div>
        <Datagrid selectedLocation={selectedLocation} SERVER_ADDRESS={SERVER_ADDRESS}/>
      </div>
      <div>
        <SerumMapFooter />
      </div>
    </div>
  );
};

export default App;