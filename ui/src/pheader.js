import React from 'react';

const headerStyle = { 
  backgroundColor: "rgba(255, 255, 255,0.9)", // Semi-transparent background for frosted glass effect
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  height: '50px',
  opacity: 1,
  zIndex: 10 // Higher z-index to ensure it's on top
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '50px',
  zIndex: 20, // Higher z-index to ensure it's on top of the blurred background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black'
};

const h2Style = {
  margin: 0,
  marginTop: '0px' // Adjust the marginTop to move the h2 element up
};

const SerumMapHeader = () => { 
  return (
    <>
      <div style={headerStyle}></div>
      <div style={overlayStyle}>
        <h2 style={h2Style}>
          Serum Map
        </h2>
      </div>
    </>
  ); 
}

export default SerumMapHeader;
