import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./header";
import SnakeForm from "./SnakeForm";
import SnakeTable from "./SnakeTable";
import HospitalForm from "./HospitalForm";
import HospitalTable from "./HospitalTable";
import ColorForm from "./ColorForm"; 
import ColorTable from "./ColorTable";
import PatternForm from "./PatternForm"; 
import PatternTable from "./PatternTable"; 
import HeadShapeForm from "./HeadShapeForm"; 
import HeadShapeTable from "./HeadShapeTable"; 

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
  const [url, seturl] = useState("");
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

  // Color state variables
  const [colorName, setColorName] = useState("");
  const [colorList, setColorList] = useState([]);
  const [updateColorValue, setUpdateColorValue] = useState("");
  const [searchColor, setSearchColor] = useState("");

  // Pattern state variables
  const [patternName, setPatternName] = useState("");
  const [patternList, setPatternList] = useState([]);
  const [updatePatternValue, setUpdatePatternValue] = useState("");
  const [searchPattern, setSearchPattern] = useState("");

  // Head shape state variables
  const [headShapeName, setHeadShapeName] = useState("");
  const [headShapeList, setHeadShapeList] = useState([]);
  const [updateHeadShapeValue, setUpdateHeadShapeValue] = useState("");
  const [searchHeadShape, setSearchHeadShape] = useState("");

  // page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addSnake = () => {
    Axios.post("http://localhost:3001/createSnake", {
      snakeID: snakeID, 
      name: snakeName,
      poison: poison,
      time: shape, 
      color: color,
      pattern: pattern,
      headShape: headShape,
      antivenomId: antivenomId,
      url: url
    }).then(() => {
      setSnakeID(""); 
      setSnakeName("");
      setPoison("");
      setColor("");
      setShape("");
      setPattern("");
      setHeadShape("");
      setAntivenomId("");
      seturl("");
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
  //--------------------------------
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
  //-------------------------------------------
  const addColor = () => {
    Axios.post("http://localhost:3001/createColor", {
      name: colorName,
    }).then(() => {
      setColorName("");
      getColors();
    });
  };

  const getColors = () => {
    Axios.get("http://localhost:3001/colors").then((response) => {
      setColorList(response.data);
    });
  };

  const updateColor = (name, value) => {
    Axios.put("http://localhost:3001/updateColor", {
      name: name,
      value: value,
    }).then((response) => {
      setColorList(
        colorList.map((val) => {
          return val['蛇的顏色'] === name ? { ...val, '蛇的顏色': value } : val;
        })
      );
    });
  };

  const deleteColor = (name) => {
    if (window.confirm(`Are you sure you want to delete the color ${name}?`)) {
      Axios.delete(`http://localhost:3001/deleteColor/${name}`).then((response) => {
        setColorList(
          colorList.filter((val) => {
            return val['蛇的顏色'] !== name;
          })
        );
      });
    }
  };

  //--------------------------------
  const addPattern = () => {
    Axios.post("http://localhost:3001/createPattern", {
      name: patternName,
    }).then(() => {
      setPatternName("");
      getPatterns();
    });
  };

  const getPatterns = () => {
    Axios.get("http://localhost:3001/patterns").then((response) => {
      setPatternList(response.data);
    });
  };

  const updatePattern = (name, value) => {
    Axios.put("http://localhost:3001/updatePattern", {
      name,
      value,
    }).then((response) => {
      setPatternList(
        patternList.map((val) => (val['蛇的斑紋'] === name ? { ...val, '蛇的斑紋': value } : val))
      );
    });
  };

  const deletePattern = (name) => {
    if (window.confirm(`Are you sure you want to delete the pattern ${name}?`)) {
      Axios.delete(`http://localhost:3001/deletePattern/${name}`).then((response) => {
        setPatternList(
          patternList.filter((val) => val['蛇的斑紋'] !== name)
        );
      });
    }
  };

  //-----------------------------------
  const addHeadShape = () => {
    Axios.post("http://localhost:3001/createHeadShape", {
      headShapeName,
    }).then(() => {
      setHeadShapeName("");
      getHeadShapes();
    });
  };

  const getHeadShapes = () => {
    Axios.get("http://localhost:3001/headShapes").then((response) => {
      setHeadShapeList(response.data);
    });
  };

  const updateHeadShape = (headShape, value) => {
    Axios.put("http://localhost:3001/updateHeadShape", {
      headShape,
      value,
    }).then(() => {
      setHeadShapeList(
        headShapeList.map((val) => (val['頭部形狀'] === headShape ? { ...val, 頭部形狀: value } : val))
      );
    });
  };

  const deleteHeadShape = (headShape) => {
    if (window.confirm(`Are you sure you want to delete the head shape ${headShape}?`)) {
      Axios.delete(`http://localhost:3001/deleteHeadShape/${headShape}`).then(() => {
        setHeadShapeList(headShapeList.filter((val) => val['頭部形狀'] !== headShape));
      });
    }
  };


  //--------------------------------------
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (selectedTable === "snake") {
      getSnakes();
    } else if (selectedTable === "hospital") {
      getHospitals();
    } else if (selectedTable === "color"){
      getColors();
    } else if (selectedTable === "pattern"){
      getPatterns();
    } else {
      getHeadShapes();
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
            seturl={seturl}
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
      ) : selectedTable === "hospital" ? (
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
        ) : selectedTable === "color" ? (
          <>
            <ColorForm
              colorName={colorName}
              setColorName={setColorName}
              addColor={addColor}
            />
            <ColorTable
              colorList={colorList}
              updateColorValue={updateColorValue}
              setUpdateColorValue={setUpdateColorValue}
              updateColor={updateColor}
              deleteColor={deleteColor}
              searchColor={searchColor}
              setSearchColor={setSearchColor}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handlePageChange={handlePageChange}
            />
          </>
          ) : selectedTable === "pattern" ? (
            <>
              <PatternForm
                patternName={patternName}
                setPatternName={setPatternName}
                addPattern={addPattern}
              />
              <PatternTable
                patternList={patternList}
                updatePatternValue={updatePatternValue}
                setUpdatePatternValue={setUpdatePatternValue}
                updatePattern={updatePattern}
                deletePattern={deletePattern}
                searchPattern={searchPattern}
                setSearchPattern={setSearchPattern}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handlePageChange={handlePageChange}
              />
            </>
          ) : (
            <>
          <HeadShapeForm
            headShapeName={headShapeName}
            setHeadShapeName={setHeadShapeName}
            addHeadShape={addHeadShape}
          />
          <HeadShapeTable
            headShapeList={headShapeList}
            updateHeadShapeValue={updateHeadShapeValue}
            setUpdateHeadShapeValue={setUpdateHeadShapeValue}
            updateHeadShape={updateHeadShape}
            deleteHeadShape={deleteHeadShape}
            searchHeadShape={searchHeadShape}
            setSearchHeadShape={setSearchHeadShape}
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