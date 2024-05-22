const containerStyle = { 
  position: 'relative', 
  textAlign: 'center', 
  padding: '20px' 
};
const hrStyle = {
  border: 0,
  paddingTop: '1px',
  background: 'linear-gradient(to right, transparent, #d0d0d5, transparent)'
};

const SerumMapFooter = () => { 
  return (
    <div style={containerStyle}>
      <hr style={hrStyle}></hr>
      <footer>
        <p>&copy;2024, Final Project</p>
      </footer>
    </div>
  ); 
}

export default SerumMapFooter;
