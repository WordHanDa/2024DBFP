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

const imageListContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '10px',
};

const ImageListWithTitle = ({ onImageClick ,SERVER_ADDRESS}) => {
  const [colorFilter, setColorFilter] = useState('');
  const [patternFilter, setPatternFilter] = useState('');
  const [headShapeFilter, setHeadShapeFilter] = useState('');
  const [snakeList, setSnakeList] = useState([]);
  const [showImages, setShowImages] = useState(false);

  const [patternOptions, setPatternOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [headShapeOptions, setHeadShapeOptions] = useState([]);

  const handleColorChange = (event) => {
    setColorFilter(event.target.value);
    setShowImages(true);
  };

  const handlePatternChange = (event) => {
    setPatternFilter(event.target.value);
    setShowImages(true);
  };

  const handleHeadShapeChange = (event) => {
    setHeadShapeFilter(event.target.value);
    setShowImages(true);
  };

  const filteredData = snakeList.filter(item => {
    return (!colorFilter || item.顏色 === colorFilter) &&
           (!patternFilter || item.斑紋 === patternFilter) &&
           (!headShapeFilter || item.頭部形狀 === headShapeFilter);
  });

  useEffect(() => {
    // Fetch initial snake data and options from backend
    Axios.get(`${SERVER_ADDRESS}/snakes`)
      .then((response) => {
        setSnakeList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching snake data:', error);
      });
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
      Axios.get(`${SERVER_ADDRESS}/snakeColors`)
      .then((response) => {
        setColorOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching color options:', error);
      });
      Axios.get(`${SERVER_ADDRESS}/head`)
      .then((response) => {
        setHeadShapeOptions(response.data.map(headShape => headShape['頭部形狀']));
      })
      .catch((error) => {
        console.error('Error fetching head shape options:', error);
      });
  
  });

  // Filter color options based on patternFilter and headShapeFilter
  const filteredColorOptions = colorOptions
    .filter(蛇的顏色 =>
      (!patternFilter || 蛇的顏色.斑紋 === patternFilter) &&
      (!headShapeFilter || 蛇的顏色.頭部形狀 === headShapeFilter)
    )
    .map(蛇的顏色 => 蛇的顏色.蛇的顏色)
    .filter((color, index, self) => self.indexOf(color) === index);

  // Filter pattern options based on colorFilter and headShapeFilter
  const filteredPatternOptions = colorOptions
    .filter(snake =>
      (!colorFilter || snake.蛇的顏色 === colorFilter) &&
      (!headShapeFilter || snake.頭部形狀 === headShapeFilter)
    )
    .map(snake => snake.斑紋)
    .filter((pattern, index, self) => self.indexOf(pattern) === index)
    .map(pattern => ({
      pattern: pattern,
      patternImageURL: patternOptions.find(option => option.pattern === pattern)?.patternImageURL
    }));

  // Filter head shape options based on colorFilter and patternFilter
  const filteredHeadShapeOptions = colorOptions
    .filter(snake =>
      (!colorFilter || snake.蛇的顏色 === colorFilter) &&
      (!patternFilter || snake.斑紋 === patternFilter)
    )
    .map(snake => snake.頭部形狀)
    .filter((headShape, index, self) => self.indexOf(headShape) === index);

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
            {filteredColorOptions.map((color, index) => (
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
            {filteredPatternOptions.map((patternObj, index) => (
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
            {filteredHeadShapeOptions.map((headShape, index) => (
              <MenuItem key={index} value={headShape}>{headShape}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {showImages && (
        <ImageList sx={{ width: '80%', maxWidth: 1800, height: 600 }}>
          {filteredData.map((item) => (
            <ImageListItem key={item.Snake_ID} >
              <div style={{ display: 'flex', width: '100%', height: 250 }}>
              <img
                srcSet={`${item.圖片URL}`}
                src={`${item.圖片URL}`}
                alt={item.種類}
                loading="lazy"
                style={{ width: '50%', height: '100%' }}
              />
              <img
                srcSet={`${item.圖片URL2}`}
                src={`${item.圖片URL2}`}
                alt={item.種類}
                loading="lazy"
                style={{ width: '50%', height: '100%' }}
              />
              </div>
              <ImageListItemBar
                title={item.種類}
                subtitle={<span>「{item.毒性}」 「{item.藥品名稱 ? `${item.藥品名稱}` : '無血清'}」</span>}
                position="below"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => onImageClick(item.藥品名稱)}
                sx={{ marginTop: 1 }}
              >
                血清查詢
              </Button>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default ImageListWithTitle;
