import React from 'react';

const styleArgument = { fontSize: '50px', color: 'black' };
const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '20px' 
};

const MapLoaction = () => { 
  return (
    <div style={containerStyle}>
      <div>
        <h1 style={styleArgument}>選擇被咬的位置</h1>
      </div>
      
    </div>
  ); 
}

export default MapLoaction;
