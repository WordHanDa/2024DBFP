import './App.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const SelectLocation = ({ handleLocationChange }) => {
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch city data from backend when component mounts
    Axios.get("http://localhost:3001/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
      });
  }, []);
 

  const handleChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    handleLocationChange(selectedLocation); // 直接傳遞輸入值
  };
 

  return (
    <div className="containerStyle">
      <div>
        <h1 className="styleArgument">選擇被咬的位置</h1>
      </div>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="location-select-label">城市</InputLabel>
        <Select
          labelId="location-select-label"
          value={location}
          onChange={handleChange}
          label="位置"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.city_id} value={city.city}>{city.city}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectLocation;
