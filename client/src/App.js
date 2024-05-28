import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./header";
import SnakeForm from "./SnakeForm";
import SnakeTable from "./SnakeTable";
import HospitalForm from "./HospitalForm";
import HospitalTable from "./HospitalTable";

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

  const updateSnake = (id, field, value) => {
    Axios.put("http://localhost:3001/updateSnake", {
      id: id,
      field: field,
      value: value,
    }).then((response) => {
      setSnakeList(
        snakeList.map((val) => {
          return val.Snake_ID === id ? { ...val, [field]: value } : val;
        })
      );
    });
  };

  const deleteSnake = (id) => {
    if (window.confirm(`Are you sure you want to delete the snake with ID ${id}?`)) {
      Axios.delete(`http://localhost:3001/deleteSnake/${id}`).then((response) => {
        setSnakeList(
          snakeList.filter((val) => {
            return val.Snake_ID !== id;
          })
        );
      });
    }
  };

  const addHospital = () => {
    Axios.post("http://localhost:3001/createHospital", {
      code: hospitalCode,
      name: hospitalName,
      address: hospitalAddress,
      phone: hospitalPhone,
    }).then(() => {
      setHospitalCode("");
      setHospitalName("");
      setHospitalAddress("");
      setHospitalPhone("");
      getHospitals();
    });
  };

  const getHospitals = () => {
    Axios.get("http://localhost:3001/hospitals").then((response) => {
      setHospitalList(response.data);
    });
  };

  const updateHospital = (code, field, value) => {
    Axios.put("http://localhost:3001/updateHospital", {
      code: code,
      field: field,
      value: value,
    }).then((response) => {
      setHospitalList(
        hospitalList.map((val) => {
          return val['醫事機構代碼'] === code ? { ...val, [field]: value } : val;
        })
      );
    });
  };

  const deleteHospital = (code) => {
    if (window.confirm(`Are you sure you want to delete the hospital with code ${code}?`)) {
      Axios.delete(`http://localhost:3001/deleteHospital/${code}`).then((response) => {
        setHospitalList(
          hospitalList.filter((val) => {
            return val['醫事機構代碼'] !== code;
          })
        );
      });
    }
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
      <Header setSelectedTable={setSelectedTable} />
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
            updateSnake={updateSnake}
            deleteSnake={deleteSnake}
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
            addHospital={addHospital}
          />
          <HospitalTable
            hospitalList={hospitalList}
            updateHospitalField={updateHospitalField}
            setUpdateHospitalField={setUpdateHospitalField}
            updateHospitalValue={updateHospitalValue}
            setUpdateHospitalValue={setUpdateHospitalValue}
            updateHospital={updateHospital}
            deleteHospital={deleteHospital}
            searchHospital={searchHospital}
            setSearchHospital={setSearchHospital}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;