import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter';
import SerumMapHeader from './pheader';
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import ParentComponent from './parentcomponent';
import SnakeTable from './SnakeTable';
import HospitalTable from './HospitalTable';

const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center', 
  padding: '10px' 
};

function App() {
  const [selectedTable, setSelectedTable] = useState("snake");

  // Snake state variables
  const [snakeList, setSnakeList] = useState([]);

  // Hospital state variables
  const [hospitalList, setHospitalList] = useState([]);

  const getSnakes = () => {
    Axios.get("http://localhost:3001/snakes").then((response) => {
      setSnakeList(response.data);
    });
  };
  const getHospitals = () => {
    Axios.get("http://localhost:3001/hospitals").then((response) => {
      setHospitalList(response.data);
    });
  };

  useEffect(() => {
    if (selectedTable === "snake") {
      getSnakes();
    } else {
      getHospitals();
    }
  }, [selectedTable]);

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
      <div>
        <button onClick={() => setSelectedTable("snake")}>Snake Table</button>
        <button onClick={() => setSelectedTable("hospital")}>Hospital Table</button>
      </div>
      {selectedTable === "snake" ? (
        <SnakeTable
          snakeList={snakeList}
        />
      ) : (
        <HospitalTable
          hospitalList={hospitalList}
        />
      )}
    </div>
  );
}

export default App;
