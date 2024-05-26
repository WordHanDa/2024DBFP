import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

  const handleColorChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handlePatternChange = (event) => {
    setPatternFilter(event.target.value);
  };

  const handleHeadShapeChange = (event) => {
    setHeadShapeFilter(event.target.value);
  };

  const filteredData = itemData.filter(item => {
    return (!colorFilter || item.color === colorFilter) &&
           (!patternFilter || item.pattern === patternFilter) &&
           (!headShapeFilter || item.headShape === headShapeFilter);
  });

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
            <MenuItem value={'紅色'}>紅色</MenuItem>
            <MenuItem value={'綠色'}>綠色</MenuItem>
            <MenuItem value={'棕色'}>棕色</MenuItem>
            <MenuItem value={'黃色'}>黃色</MenuItem>
            <MenuItem value={'橘紅色'}>橘紅色</MenuItem>
            <MenuItem value={'黑色'}>黑色</MenuItem>
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
            <MenuItem value={'環狀'}>環狀</MenuItem>
            <MenuItem value={'圓斑'}>圓斑</MenuItem>
            <MenuItem value={'V字斑紋'}>V字斑紋</MenuItem>
            <MenuItem value={'棋盤狀'}>棋盤狀</MenuItem>
            <MenuItem value={'矩形斑紋'}>矩形斑紋</MenuItem>
            <MenuItem value={'Y字斑紋'}>Y字斑紋</MenuItem>
            <MenuItem value={'破碎斑紋'}>破碎斑紋</MenuItem>
            <MenuItem value={'雜班'}>雜班</MenuItem>
            <MenuItem value={'W字斑紋'}>W字斑紋</MenuItem>
            <MenuItem value={'花紋'}>花紋</MenuItem>
            <MenuItem value={'單一'}>單一</MenuItem>
            <MenuItem value={'直線'}>直線</MenuItem>
            <MenuItem value={'斑塊'}>斑塊</MenuItem>
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
            <MenuItem value={'橢圓形'}>橢圓形</MenuItem>
            <MenuItem value={'三角形'}>三角形</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ImageList sx={{ width: '100%', maxWidth: 1200, height: 450 }}>
        {filteredData.map((item) => (
          <ImageListItem key={item.img}>
            <Button
              onClick={() => handleButtonClick(item.title)}
              sx={{
                padding: 0,
                border: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%' }}
              />
            </Button>
            <ImageListItemBar
              title={item.title}
              subtitle={<span>{item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const itemData = [
  {
    img: './snake_image/紅竹蛇.jpg',
    title: '紅竹蛇',
    author: '無毒',
    color: '紅色',
    pattern: '環狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/紅斑蛇.jpg',
    title: '紅斑蛇',
    author: '無毒',
    color: '紅色',
    pattern: '圓斑',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/史丹吉氏斜鱗蛇.jpg',
    title: '史丹吉氏斜鱗蛇',
    author: '無毒',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/環紋赤蛇.jpg',
    title: '環紋赤蛇',
    author: '強',
    color: '紅色',
    pattern: '環狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/梭德氏遊蛇.jpg',
    title: '梭德氏遊蛇',
    author: '無毒',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/赤背松柏根.jpg',
    title: '赤背松柏根',
    author: '無毒',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/草花蛇.jpg',
    title: '草花蛇',
    author: '無毒',
    color: '棕色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/瑪家山龜殼花.jpg',
    title: '瑪家山龜殼花',
    author: '強',
    color: '紅褐色',
    pattern: '矩形斑紋',
    headShape: '三角形'
  },
  {
    img: './snake_image/赤腹松柏根.jpg',
    title: '赤腹松柏根',
    author: '無毒',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/茶斑蛇.jpg',
    title: '茶斑蛇',
    author: '弱',
    color: '棕色',
    pattern: 'Y字斑紋',
    headShape: '三角形'
  },
  {
    img: './snake_image/大頭蛇.jpg',
    title: '大頭蛇',
    author: '弱',
    color: '紅褐色',
    pattern: '破碎斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/斯文豪氏頸槽蛇.jpg',
    title: '斯文豪氏頸槽蛇',
    author: '弱',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/台灣鈍頭蛇.jpg',
    title: '台灣鈍頭蛇',
    author: '無毒',
    color: '綠色',
    pattern: '雜班',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/赤腹遊蛇.jpg',
    title: '赤腹遊蛇',
    author: '無毒',
    color: '紅色',
    pattern: '直線',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/台灣黑眉錦蛇.jpg',
    title: '台灣黑眉錦蛇',
    author: '無毒',
    color: '棕色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/王錦蛇.jpg',
    title: '王錦蛇',
    author: '無毒',
    color: '黃色',
    pattern: '斑塊',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/標蛇.jpg',
    title: '標蛇',
    author: '無毒',
    color: '紅色',
    pattern: 'Y字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/茶斑蛇_2.jpg',
    title: '茶斑蛇',
    author: '弱',
    color: '棕色',
    pattern: 'Y字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/泰雅鈍頭蛇.jpg',
    title: '泰雅鈍頭蛇',
    author: '無毒',
    color: '棕色',
    pattern: '破碎斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/駒井氏鈍頭蛇.jpg',
    title: '駒井氏鈍頭蛇',
    author: '無毒',
    color: '綠色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/台灣赤煉蛇.jpg',
    title: '台灣赤煉蛇',
    author: '強',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/高砂蛇.jpg',
    title: '高砂蛇',
    author: '無毒',
    color: '綠色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/細紋南蛇.jpg',
    title: '細紋南蛇',
    author: '無毒',
    color: '黃色',
    pattern: '直線',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/花浪蛇.jpg',
    title: '花浪蛇',
    author: '無毒',
    color: '紅色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/赤尾青竹絲.jpg',
    title: '赤尾青竹絲',
    author: '強',
    color: '綠色',
    pattern: '花紋',
    headShape: '三角形'
  },
  {
    img: './snake_image/灰腹綠錦蛇.jpg',
    title: '灰腹綠錦蛇',
    author: '無毒',
    color: '綠色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/翠青蛇.jpg',
    title: '翠青蛇',
    author: '無毒',
    color: '綠色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/過山刀.jpg',
    title: '過山刀',
    author: '無毒',
    color: '黃色',
    pattern: '直線',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/史丹吉氏斜鱗蛇_2.jpg',
    title: '史丹吉氏斜鱗蛇',
    author: '無毒',
    color: '紅色',
    pattern: 'V字斑紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/羽鳥氏帶紋赤蛇.jpg',
    title: '羽鳥氏帶紋赤蛇',
    author: '強',
    color: '紅色',
    pattern: '雜班',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/金絲蛇.jpg',
    title: '金絲蛇',
    author: '無毒',
    color: '黃色',
    pattern: '花紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/福建頸斑蛇.jpg',
    title: '福建頸斑蛇',
    author: '無毒',
    color: '紅色',
    pattern: '直線',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/白腹遊蛇.jpg',
    title: '白腹遊蛇',
    author: '無毒',
    color: '棕色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/龜殼花.jpg',
    title: '龜殼花',
    author: '強',
    color: '棕色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/擬龜殼花.jpg',
    title: '擬龜殼花',
    author: '無毒',
    color: '紅色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/菊池氏龜殼花.jpg',
    title: '菊池氏龜殼花',
    author: '強',
    color: '黃色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/百步蛇.jpg',
    title: '百步蛇',
    author: '強',
    color: '紅色',
    pattern: '花紋',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/高砂蛇_2.jpg',
    title: '高砂蛇',
    author: '無毒',
    color: '黃色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/雨傘節.jpg',
    title: '雨傘節',
    author: '強',
    color: '黑色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/白梅花蛇.jpg',
    title: '白梅花蛇',
    author: '無毒',
    color: '棕色',
    pattern: '棋盤狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/眼鏡蛇.jpg',
    title: '眼鏡蛇',
    author: '強',
    color: '黑色',
    pattern: '單一',
    headShape: '三角形'
  },
  {
    img: './snake_image/黑頭蛇.jpg',
    title: '黑頭蛇',
    author: '無毒',
    color: '黑色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/鐵線蛇.jpg',
    title: '鐵線蛇',
    author: '無毒',
    color: '黑色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/鉤盲蛇.jpg',
    title: '鉤盲蛇',
    author: '無毒',
    color: '黑色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/雙環蛇.jpg',
    title: '雙環蛇',
    author: '無毒',
    color: '黑色',
    pattern: '環狀',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/原矛頭蝮.jpg',
    title: '原矛頭蝮',
    author: '強',
    color: '黑色',
    pattern: '棋盤狀',
    headShape: '三角形'
  },
  {
    img: './snake_image/烙鐵頭.jpg',
    title: '烙鐵頭',
    author: '強',
    color: '棕色',
    pattern: '花紋',
    headShape: '三角形'
  },
  {
    img: './snake_image/翠青赤緣錦蛇.jpg',
    title: '翠青赤緣錦蛇',
    author: '無毒',
    color: '綠色',
    pattern: '單一',
    headShape: '橢圓形'
  },
  {
    img: './snake_image/蛇蜥.jpg',
    title: '蛇蜥',
    author: '無毒',
    color: '綠色',
    pattern: '單一',
    headShape: '橢圓形'
  },
];
export default ImageListWithTitle;
