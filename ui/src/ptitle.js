import React from 'react';

const styleArgument = { fontSize: '100px', color: 'white' };
const styleArgument2 = { fontSize: '30px', color: 'white' };
const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '100px' 
};
const backgroundStyle = { 
  backgroundImage: 'url(./titleBG.jpg)', 
  backgroundSize: 'cover', 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0, 
  filter: 'brightness(0.4)', 
  zIndex: 0 
};
const overlayStyle = {
  position: 'relative',
  zIndex: 1,
  color: 'white'
};

const SerumMapTitle = () => { 
  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}>
        <h1 style={styleArgument}>毒蛇血清地圖</h1>
        <h2 style={styleArgument2}>立即尋找符合您需求的血清與醫院</h2>
      </div>
    </div>
  ); 
}

export default SerumMapTitle;
