import './App.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectLocation = ({ handleLocationChange }) => {
  const [location, setLocation] = useState({ city: '', district: '', road: '' });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [roads, setRoads] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
      });
  }, []);

  useEffect(() => {
    if (location.city) {
      Axios.get(`http://localhost:3001/sites?city=${location.city}`)
        .then((response) => {
          setDistricts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching district data:', error);
        });
    } else {
      setDistricts([]);
      setRoads([]);
    }
  }, [location.city]);

  useEffect(() => {
    if (location.district) {
      Axios.get(`http://localhost:3001/roads?site=${location.district}`)
        .then((response) => {
          setRoads(response.data);
        })
        .catch((error) => {
          console.error('Error fetching road data:', error);
        });
    } else {
      setRoads([]);
    }
  }, [location.district]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocation((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === 'city' && { district: '', road: '' }),
      ...(name === 'district' && { road: '' }),
    }));
    handleLocationChange({ ...location, [name]: value });
  };

  return (
    <div className="containerStyle">
      <div>
        <h1 className="styleArgument">選擇被咬的位置</h1>
      </div>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel id="city-select-label">城市</InputLabel>
        <Select
          labelId="city-select-label"
          name="city"
          value={location.city}
          onChange={handleChange}
          label="城市"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.city_id} value={city.city}>{city.city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel id="district-select-label">區域</InputLabel>
        <Select
          labelId="district-select-label"
          name="district"
          value={location.district}
          onChange={handleChange}
          label="區域"
          disabled={!location.city}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.site_id} value={district.site}>{district.site}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="road-select-label">道路</InputLabel>
        <Select
          labelId="road-select-label"
          name="road"
          value={location.road}
          onChange={handleChange}
          label="道路"
          disabled={!location.district}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {roads.map((road) => (
            <MenuItem key={road.road_id} value={road.road}>{road.road}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLocation;
