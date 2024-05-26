import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const styleArgument = { fontSize: '50px', color: 'black' };
const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '20px' 
};

const MapLoaction = ({ location, handleLocationChange }) => { 
  return (
    <div style={containerStyle}>
      <div>
        <h1 style={styleArgument}>選擇被咬的位置</h1>
      </div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="location-select-label" sx={{ fontSize: '1rem' }}>城市</InputLabel>
          <Select
            labelId="location-select-label"
            value={location}
            onChange={handleLocationChange}
            label="位置"
            sx={{ fontSize: '1rem', height: '40px' }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={'基隆市'}>基隆市</MenuItem>
            <MenuItem value={'台北市'}>台北市</MenuItem>
            <MenuItem value={'新北市'}>新北市</MenuItem>
            <MenuItem value={'桃園市'}>桃園市</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  ); 
}

export default MapLoaction;
