import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';

const SERVER_ADDRESS = "http://172.27.6.192:3001";

const imageListContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '10px',
};

const handleButtonClick = (title) => {
  console.log(`Image title: ${title}`);
};

const ImageListWithTitle = () => {
  const [colorFilter, setColorFilter] = useState('');
  const [patternFilter, setPatternFilter] = useState('');
  const [headShapeFilter, setHeadShapeFilter] = useState('');
  const [snakeList, setSnakeList] = useState([]);

  const [colorOptions, setColorOptions] = useState([]);
  const [patternOptions, setPatternOptions] = useState([]);
  const [headShapeOptions, setHeadShapeOptions] = useState([]);

  const handleColorChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handlePatternChange = (event) => {
    setPatternFilter(event.target.value);
  };

  const handleHeadShapeChange = (event) => {
    setHeadShapeFilter(event.target.value);
  };

  const filteredData = snakeList.filter(item => {
    return (!colorFilter || item.顏色 === colorFilter) &&
           (!patternFilter || item.斑紋 === patternFilter) &&
           (!headShapeFilter || item.頭部形狀 === headShapeFilter);
  });

  useEffect(() => {
    // Fetch snake data from backend
    Axios.get(`${SERVER_ADDRESS}/snakes`)
      .then((response) => {
        setSnakeList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching snake data:', error);
      });
  
    // Fetch color options from backend when component mounts
    Axios.get(`${SERVER_ADDRESS}/snakeColors`)
      .then((response) => {
        setColorOptions(response.data.map(color => color['蛇的顏色']));
      })
      .catch((error) => {
        console.error('Error fetching color options:', error);
      });
  
    // Fetch pattern options from backend when component mounts
    Axios.get(`${SERVER_ADDRESS}/snakePatterns`)
      .then((response) => {
        setPatternOptions(response.data.map(pattern => ({
          pattern: pattern['蛇的斑紋'],
          patternImageURL: pattern['patternImageURL']
        })));
      })
      .catch((error) => {
        console.error('Error fetching pattern options:', error);
      });
  
    // Fetch head shape options from backend when component mounts
    Axios.get(`${SERVER_ADDRESS}/head`)
      .then((response) => {
        setHeadShapeOptions(response.data.map(headShape => headShape['頭部形狀']));
      })
      .catch((error) => {
        console.error('Error fetching head shape options:', error);
      });
  }, []);

  return (
    <div style={imageListContainerStyle}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="color-select-label">顏色</InputLabel>
          <Select
            labelId="color-select-label"
            value={colorFilter}
            onChange={handleColorChange}
            label="顏色"
          >
            <MenuItem value=""><em>全部</em></MenuItem>
            {colorOptions.map((color, index) => (
              <MenuItem key={index} value={color}>{color}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="pattern-select-label">斑紋</InputLabel>
          <Select
            labelId="pattern-select-label"
            value={patternFilter}
            onChange={handlePatternChange}
            label="斑紋"
          >
            <MenuItem value=""><em>全部</em></MenuItem>
            {patternOptions.map((patternObj, index) => (
              <MenuItem key={index} value={patternObj.pattern}>
                <Avatar src={patternObj.patternImageURL} sx={{ marginRight: 1, width: 80, height: 90 }} />
                {patternObj.pattern}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }} >
          <InputLabel id="head-shape-select-label">頭部形狀</InputLabel>
          <Select
            labelId="head-shape-select-label"
            value={headShapeFilter}
            onChange={handleHeadShapeChange}
            label="頭部形狀"
          >
            <MenuItem value=""><em>全部</em></MenuItem>
            {headShapeOptions.map((headShape, index) => (
              <MenuItem key={index} value={headShape}>{headShape}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <ImageList sx={{ width: '80%', maxWidth: 1200, height: 450 }}>
        {filteredData.map((item) => (
          <ImageListItem key={item.Snake_ID}>
            <Button
              onClick={() => handleButtonClick(item.種類)}
              sx={{
                padding: 0,
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                srcSet={`${item.圖片URL}`}
                src={`${item.圖片URL}`}
                alt={item.種類}
                loading="lazy"
                style={{ width: '100%', height: '100%' }}
              />
            </Button>
            <ImageListItemBar
              title={item.種類}
              subtitle={<span>「{item.毒性}」 「{item.藥品名稱 ? `${item.藥品名稱}` : '無'}」</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageListWithTitle;
