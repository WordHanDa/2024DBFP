import React from 'react';

const styleArgument = {
  fontSize: '50px',
  color: 'black' 
};
const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '10px' 
};

const SnakeFeature = () => { 
  return (
    <div style={containerStyle}>
        <h1 style={styleArgument}>蛇的特徵及種類</h1>
    </div>
  ); 
}

export default SnakeFeature;
