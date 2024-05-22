import React from 'react';

const headerStyle = { 
  backgroundColor: "white", 
  backgroundSize: 'cover', 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  height: '80px',
  opacity: 0.9,
  zIndex: 10 // Higher z-index to ensure it's on top
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '100px',
  zIndex: 20, // Higher z-index to ensure it's on top of the blurred background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black'
};

const h1Style = {
  margin: 0,
  marginTop: '-20px' // Adjust the marginTop to move the h1 element up
};

const SerumMapHeader = () => { 
  return (
    <>
      <div style={headerStyle}></div>
      <div style={overlayStyle}>
        <h1 style={h1Style}>
          Serum Map
        </h1>
      </div>
    </>
  ); 
}

export default SerumMapHeader;
