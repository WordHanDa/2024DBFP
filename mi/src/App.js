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
import LocationForm from "./LocationForm"; 
import LocationTable from "./LocationTable"; 

const SERVER_ADDRESS = "http://localhost:3001";

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
  const [antivenomId, setAntivenomId] = useState(null);
  const [url, seturl] = useState("");
  const [url2, seturl2] = useState("");
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
  const [patternURL, setPatternURL] = useState("");
  const [patternList, setPatternList] = useState([]);
  const [updatePatternValue, setUpdatePatternValue] = useState("");
  const [searchPattern, setSearchPattern] = useState("");

  // Head shape state variables
  const [headShapeName, setHeadShapeName] = useState("");
  const [headShapeList, setHeadShapeList] = useState([]);
  const [updateHeadShapeValue, setUpdateHeadShapeValue] = useState("");
  const [searchHeadShape, setSearchHeadShape] = useState("");

  // Antivenom Location state variables
  const [LocationHospital, setLocationHospital] = useState("");
  const [LocationAntivenom, setLocationAntivenom] = useState("");
  const [LocationHospitalNumber, setLocationHospitalNumber] = useState("");
  const [LocationList, setLocationList] = useState([]);
  const [updateLocationField, setUpdateLocationField] = useState("醫院名稱");
  const [updateLocationValue, setUpdateLocationValue] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addSnake = () => {
    // 檢查是否已存在相同名稱及顏色的蛇
    Axios.get(`${SERVER_ADDRESS}/snakes`).then((response) => {
      const existingSnake = response.data.find(snake => 
        snake.種類 === snakeName && snake.顏色 === color
      );
  
      if (existingSnake) {
        alert("A snake with the same name and color already exists.");
      } else {
        // 若不存在相同的蛇，則新增蛇
        Axios.post(`${SERVER_ADDRESS}/createSnake`, {
          snakeID: snakeID, 
          name: snakeName,
          poison: poison,
          time: shape, 
          color: color,
          pattern: pattern,
          headShape: headShape,
          antivenomId: antivenomId,
          url: url,
          url2: url2
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
          seturl2("");
          getSnakes();
        }).catch((error) => {
          console.error("Error adding snake:", error);
          alert("Failed to add snake");
        });
      }
    }).catch((error) => {
      console.error("Error checking existing snakes:", error);
      alert("Failed to check existing snakes");
    });
  };
  
  
  
  const getSnakes = () => {
    Axios.get(`${SERVER_ADDRESS}/snakes`).then((response) => {
      setSnakeList(response.data);
    }).catch((error) => {
      console.error("Error fetching snakes:", error);
      alert("Failed to fetch snakes");
    });
  };
  
  
  const updateSnake = (id, field, value) => {
    Axios.put(`${SERVER_ADDRESS}/updateSnake`, {
      id: id,
      field: field,
      value: value,
    }).then((response) => {
      setSnakeList(
        snakeList.map((val) => {
          return val.Snake_ID === id ? { ...val, [field]: value } : val;
        })
      );
    }).catch((error) => {
      console.error("Error updating snake:", error);
      alert("Failed to update snake");
    });
  };
  
  
  const deleteSnake = (id) => {
    if (window.confirm(`Are you sure you want to delete the snake with ID ${id}?`)) {
      Axios.delete(`${SERVER_ADDRESS}/deleteSnake/${id}`).then((response) => {
        setSnakeList(
          snakeList.filter((val) => {
            return val.Snake_ID !== id;
          })
        );
      }).catch((error) => {
        console.error("Error deleting snake:", error);
        alert("Failed to delete snake");
      });
    }
  };
  
  //--------------------------------
  const addHospital = () => {
    // 检查是否已存在相同名称及代码的医院
    Axios.get(`${SERVER_ADDRESS}/hospitals`).then((response) => {
      const existingHospital = response.data.find(hospital => 
        hospital.醫院名稱 === hospitalName && hospital.醫事機構代碼 === hospitalCode
      );
  
      if (existingHospital) {
        alert("A hospital with the same name and code already exists.");
      } else {
        // 若不存在相同的医院，则新增医院
        Axios.post(`${SERVER_ADDRESS}/createHospital`, {
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
        }).catch((error) => {
          console.error("Error adding hospital:", error);
          if (error.response && error.response.status === 400) {
            alert("A hospital with the same name or code already exists.");
          } else {
            alert("Failed to add hospital");
          }
        });
      }
    }).catch((error) => {
      console.error("Error checking existing hospitals:", error);
      alert("Failed to check existing hospitals");
    });
  };
  
    
  
  const getHospitals = () => {
    Axios.get(`${SERVER_ADDRESS}/hospitals`).then((response) => {
      setHospitalList(response.data);
    });
  };
  
  const updateHospital = (code, field, value) => {
    Axios.put(`${SERVER_ADDRESS}/updateHospital`, {
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
  
  const deleteHospital = (code, name) => {
    if (window.confirm(`Are you sure you want to delete the hospital with code ${code} and name ${name}?`)) {
      Axios.delete(`${SERVER_ADDRESS}/deleteHospital/${code}/${name}`).then((response) => {
        setHospitalList(
          hospitalList.filter((val) => {
            return val['醫事機構代碼'] !== code || val['醫院名稱'] !== name;
          })
        );
      });
    }
  };
  //-------------------------------------------
  const addColor = () => {
    Axios.post(`${SERVER_ADDRESS}/createColor`, {
      name: colorName,
    }).then(() => {
      setColorName("");
      getColors();
    }).catch((error) => {
      console.error("Error adding color:", error);
      if (error.response && error.response.status === 400) {
        alert("A color with the same name already exists.");
      } else {
        alert("Failed to add color");
      }
    });
  };
  
  
  const getColors = () => {
    Axios.get(`${SERVER_ADDRESS}/colors`).then((response) => {
      setColorList(response.data);
    });
  };
  
  const updateColor = (name, value) => {
    Axios.put(`${SERVER_ADDRESS}/updateColor`, {
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
      Axios.delete(`${SERVER_ADDRESS}/deleteColor/${name}`).then((response) => {
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
    Axios.post(`${SERVER_ADDRESS}/createPattern`, {
      name: patternName,
      URL: patternURL,
    }).then(() => {
      setPatternName("");
      setPatternURL("");
      getPatterns();
    }).catch((error) => {
      console.error("Error adding pattern:", error);
      if (error.response && error.response.status === 400) {
        alert("A pattern with the same name already exists.");
      } else {
        alert("Failed to add pattern");
      }
    });
  };
  
  
  const getPatterns = () => {
    Axios.get(`${SERVER_ADDRESS}/patterns`).then((response) => {
      setPatternList(response.data);
    });
  };
  
  const updatePattern = (name, value) => {
    Axios.put(`${SERVER_ADDRESS}/updatePattern`, {
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
      Axios.delete(`${SERVER_ADDRESS}/deletePattern/${name}`).then((response) => {
        setPatternList(
          patternList.filter((val) => val['蛇的斑紋'] !== name)
        );
      });
    }
  };

  //-----------------------------------
  const addHeadShape = () => {
    Axios.post(`${SERVER_ADDRESS}/createHeadShape`, {
      headShapeName,
    }).then(() => {
      setHeadShapeName("");
      getHeadShapes();
    }).catch((error) => {
      console.error("Error adding head shape:", error);
      if (error.response && error.response.status === 400) {
        alert("A head shape with the same name already exists.");
      } else {
        alert("Failed to add head shape");
      }
    });
  };
  
  
  const getHeadShapes = () => {
    Axios.get(`${SERVER_ADDRESS}/headShapes`).then((response) => {
      setHeadShapeList(response.data);
    });
  };
  
  const updateHeadShape = (headShape, value) => {
    Axios.put(`${SERVER_ADDRESS}/updateHeadShape`, {
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
      Axios.delete(`${SERVER_ADDRESS}/deleteHeadShape/${headShape}`).then(() => {
        setHeadShapeList(headShapeList.filter((val) => val['頭部形狀'] !== headShape));
      });
    }
  };

  //-----------------------------------
  const addLocation = () => {
    // 检查是否已存在相同的记录
    Axios.get(`${SERVER_ADDRESS}/hospitals`).then((response) => {
      const existingLocation = response.data.find(location => 
        location.醫院名稱 === LocationHospital && 
        location.藥品名稱 === LocationAntivenom &&
        location.醫事機構代碼 === LocationHospitalNumber
      );
  
      if (existingLocation) {
        alert("A record with the same hospital name, antivenom name, and hospital number already exists.");
      } else {
        // 若不存在相同的记录，則新增记录
        Axios.post(`${SERVER_ADDRESS}/createLocation`, {
          hname: LocationHospital,
          aname: LocationAntivenom,
          hnumber: LocationHospitalNumber,
        }).then(() => {
          setLocationHospital("");
          setLocationAntivenom("");
          setLocationHospitalNumber("");
          getLocations();
        }).catch((error) => {
          console.error("Error adding location:", error);
          alert("Failed to add location");
        });
      }
    }).catch((error) => {
      console.error("Error checking existing locations:", error);
      alert("Failed to check existing locations");
    });
  };
  
  
  const getLocations = () => {
    Axios.get(`${SERVER_ADDRESS}/Location`).then((response) => {
      setLocationList(response.data);
    });
  };
  
  const updateLocation = (hospital, medicine, medicalCode, field, value) => {
    Axios.put(`${SERVER_ADDRESS}/updateLocation`, {
      hospital,
      medicine,
      medicalCode,
      field,
      value,
    }).then(() => {
      setLocationList(
        LocationList.map((val) => {
          if (
            val['醫院名稱'] === hospital &&
            val['藥品名稱'] === medicine &&
            val['醫事機構代碼'] === medicalCode
          ) {
            return { ...val, [field]: value };
          }
          return val;
        })
      );
    });
  };
  
  const deleteLocation = (hospital, medicine, medicalCode) => {
    if (
      window.confirm(
        `Are you sure you want to delete the location ${hospital}, ${medicine}, ${medicalCode}?`
      )
    ) {
      Axios.delete(
        `${SERVER_ADDRESS}/deleteLocation/${hospital}/${medicine}/${medicalCode}`
      ).then(() => {
        setLocationList(
          LocationList.filter(
            (val) =>
              val['醫院名稱'] !== hospital ||
              val['藥品名稱'] !== medicine ||
              val['醫事機構代碼'] !== medicalCode
          )
        );
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
    } else if (selectedTable === "headShape"){
      getHeadShapes();
    } else {
      getLocations();
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
                patternURL={patternURL}
                setPatternURL={setPatternURL}
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
          ) : selectedTable === "headShape" ? (
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
          ) : (
            <>
          <LocationForm
            LocationHospital={LocationHospital}
            setLocationHospital={setLocationHospital}
            LocationAntivenom={LocationAntivenom}
            setLocationAntivenom={setLocationAntivenom}
            LocationHospitalNumber={LocationHospitalNumber}
            setLocationHospitalNumber={setLocationHospitalNumber}
            addLocation={addLocation}
          />
          <LocationTable
            LocationList={LocationList}
            updateLocationField={updateLocationField}
            setUpdateLocationField={setUpdateLocationField}
            updateLocationValue={updateLocationValue}
            setUpdateLocationValue={setUpdateLocationValue}
            updateLocation={updateLocation}
            deleteLocation={deleteLocation}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
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