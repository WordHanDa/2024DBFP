import './App.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

const SelectLocation = ({ handleLocationChange }) => {
  const [location, setLocation] = useState({ city: '', district: '', road: '', serum: '' });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [roads, setRoads] = useState([]);
  const [serums, setSerums] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingRoads, setLoadingRoads] = useState(false);

  useEffect(() => {
    Axios.get("http://192.168.137.196:3001/cities")
      .then(response => setCities(response.data))
      .catch(error => console.error('Error fetching city data:', error))
      .finally(() => setLoadingCities(false));

    Axios.get("http://192.168.137.196:3001/snakeSerum")
      .then(response => setSerums(response.data))
      .catch(error => console.error('Error fetching snakeSerum data:', error));
  }, []);

  useEffect(() => {
    if (location.city) {
      setLoadingDistricts(true);
      Axios.get(`http://192.168.137.196:3001/sites?city=${location.city}`)
        .then(response => setDistricts(response.data))
        .catch(error => console.error('Error fetching district data:', error))
        .finally(() => setLoadingDistricts(false));
    } else {
      setDistricts([]);
      setRoads([]);
    }
  }, [location.city]);

  useEffect(() => {
    if (location.district) {
      setLoadingRoads(true);
      Axios.get(`http://192.168.137.196:3001/roads?site=${location.district}`)
        .then(response => setRoads(response.data))
        .catch(error => console.error('Error fetching road data:', error))
        .finally(() => setLoadingRoads(false));
    } else {
      setRoads([]);
    }
  }, [location.district]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocation(prevState => {
      const newLocation = { ...prevState, [name]: value };
      if (name === 'city') {
        newLocation.district = '';
        newLocation.road = '';
      } else if (name === 'district') {
        newLocation.road = '';
      }
      handleLocationChange(newLocation);
      return newLocation;
    });
  };

  const menuProps = {
    PaperProps: {
      style: {
        width: 250, // Set the width of the dropdown menu
      },
    },
  };

  return (
    <div className="containerStyle">
      <div>
        <h1 className="styleArgument">選擇所在位置</h1>
      </div>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel id="city-select-label">城市</InputLabel>
        <Select
          labelId="city-select-label"
          name="city"
          value={location.city}
          onChange={handleChange}
          label="城市"
          MenuProps={menuProps}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {loadingCities ? <MenuItem disabled><CircularProgress size={24} /></MenuItem> : cities.map(city => (
            <MenuItem key={city.city_id} value={city.city}>{city.city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }} disabled={!location.city}>
        <InputLabel id="district-select-label">區域</InputLabel>
        <Select
          labelId="district-select-label"
          name="district"
          value={location.district}
          onChange={handleChange}
          label="區域"
          MenuProps={menuProps}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {loadingDistricts ? <MenuItem disabled><CircularProgress size={24} /></MenuItem> : districts.map(district => (
            <MenuItem key={district.site_id} value={district.site}>{district.site}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120, marginBottom: 2 }} disabled={!location.district}>
        <InputLabel id="road-select-label">道路</InputLabel>
        <Select
          labelId="road-select-label"
          name="road"
          value={location.road}
          onChange={handleChange}
          label="道路"
          MenuProps={menuProps}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {loadingRoads ? <MenuItem disabled><CircularProgress size={24} /></MenuItem> : roads.map(road => (
            <MenuItem key={road.road_id} value={road.road}>{road.road}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="serum-select-label">藥品名稱</InputLabel>
        <Select
          labelId="serum-select-label"
          name="serum"
          value={location.serum}
          onChange={handleChange}
          label="藥品名稱"
          MenuProps={menuProps}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {serums.map(serum => (
            <MenuItem key={serum.serum_id} value={serum.藥品名稱}>{serum.藥品名稱}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLocation;
