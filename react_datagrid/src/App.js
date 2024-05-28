import React from 'react';
import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter'
import SerumMapHeader from './pheader'
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import ParentComponent from './parentcomponent';
import SnakeForm from "./SnakeForm";
import SnakeTable from "./SnakeTable";
import HospitalForm from "./HospitalForm";
import HospitalTable from "./HospitalTable";
import { useState, useEffect } from "react";
import Axios from "axios";

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
  const [snakeID, setSnakeID] = useState(""); // Add state for Snake_ID
  const [snakeName, setSnakeName] = useState("");
  const [poison, setPoison] = useState("");
  const [color, setColor] = useState("");
  const [shape, setShape] = useState("");
  const [pattern, setPattern] = useState("");
  const [headShape, setHeadShape] = useState("");
  const [antivenomId, setAntivenomId] = useState("");
  const [snakeList, setSnakeList] = useState([]);
  const [updateField, setUpdateField] = useState("poison");
  const [updateValue, setUpdateValue] = useState("");
  const [searchSnake, setSearchSnake] = useState("");

  // Hospital state variables
  const [hospitalCode, setHospitalCode] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalList, setHospitalList] = useState([]);
  const [updateHospitalField, setUpdateHospitalField] = useState("醫院名稱");
  const [updateHospitalValue, setUpdateHospitalValue] = useState("");
  const [searchHospital, setSearchHospital] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addSnake = () => {
    Axios.post("http://localhost:3001/createSnake", {
      snakeID: snakeID, // Ensure this matches the server-side parameter
      name: snakeName,
      poison: poison,
      time: shape, // Assuming 'shape' is used for '出沒時間'
      color: color,
      pattern: pattern,
      headShape: headShape,
      antivenomId: antivenomId,
    }).then(() => {
      setSnakeID(""); // Reset all form fields
      setSnakeName("");
      setPoison("");
      setColor("");
      setShape("");
      setPattern("");
      setHeadShape("");
      setAntivenomId("");
      getSnakes();
    });
  };

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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <ParentComponent />
      </div>
      <div>
        <SerumMapFooter />
      </div>
      {selectedTable === "snake" ? (
        <>
          <SnakeForm
            snakeID={snakeID}
            snakeName={snakeName}
            poison={poison}
            color={color}
            shape={shape}
            pattern={pattern}
            headShape={headShape}
            antivenomId={antivenomId}
            setSnakeID={setSnakeID}
            setSnakeName={setSnakeName}
            setPoison={setPoison}
            setColor={setColor}
            setShape={setShape}
            setPattern={setPattern}
            setHeadShape={setHeadShape}
            setAntivenomId={setAntivenomId}
            addSnake={addSnake}
          />
          <SnakeTable
            snakeList={snakeList}
            updateField={updateField}
            setUpdateField={setUpdateField}
            updateValue={updateValue}
            setUpdateValue={setUpdateValue}
            searchSnake={searchSnake}
            setSearchSnake={setSearchSnake}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <HospitalForm
            hospitalCode={hospitalCode}
            hospitalName={hospitalName}
            hospitalAddress={hospitalAddress}
            hospitalPhone={hospitalPhone}
            setHospitalCode={setHospitalCode}
            setHospitalName={setHospitalName}
            setHospitalAddress={setHospitalAddress}
            setHospitalPhone={setHospitalPhone}
          />
          <HospitalTable
            hospitalList={hospitalList}
            updateHospitalField={updateHospitalField}
            setUpdateHospitalField={setUpdateHospitalField}
            updateHospitalValue={updateHospitalValue}
            setUpdateHospitalValue={setUpdateHospitalValue}
            searchHospital={searchHospital}
            setSearchHospital={setSearchHospital}
          />
        </>
      )}
    </div>
  );
}

export default App;
