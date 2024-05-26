import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '20px' 
};

const MapLocation = ({ handleLocationChange }) => {
  const [location, setLocation] = React.useState('台北市');

  const handleChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    handleLocationChange(selectedLocation); // 直接傳遞輸入值
  };

  return (
    <div style={containerStyle}>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="location-select-label" sx={{ fontSize: '1rem' }}>城市</InputLabel>
        <Select
          labelId="location-select-label"
          value={location}
          onChange={handleChange}
          label="位置"
          sx={{ fontSize: '1rem', height: '40px' }}
        >
          <MenuItem value={''}><em>None</em></MenuItem>
          <MenuItem value={'基隆市'}>基隆市</MenuItem>
          <MenuItem value={'台北市'}>台北市</MenuItem>
          <MenuItem value={'新北市'}>新北市</MenuItem>
          <MenuItem value={'桃園市'}>桃園市</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default MapLocation;




