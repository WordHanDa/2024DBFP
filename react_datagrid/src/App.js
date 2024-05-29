import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter';
import SerumMapHeader from './pheader';
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import ParentComponent from './parentcomponent';
import SnakeTable from './SnakeTable';

const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center', 
  padding: '10px' 
};

function App() {
  const [selectedTable] = useState("snake");

  // Snake state variables
  

  // Hospital state variables
  const [hospitalList, setHospitalList] = useState([]);


  const getHospitals = () => {
    Axios.get("http://localhost:3001/hospitals").then((response) => {
      setHospitalList(response.data);
    });
  };


  return (
    <div className="App">
      <div>
        <SerumMapHeader />
      </div>
      <div>
        <SeurmMapTitle />
      </div>
      <div>
        <SnakeFeature />
      </div>
      <div style={containerStyle}>
        <ImageListWithTitle />
      </div>
      <div>
        <ParentComponent hospitalList={hospitalList}/>
      </div>
      <div>
        <SerumMapFooter />
      </div>
      <SnakeTable/>
    </div>
  );
}

export default App;
