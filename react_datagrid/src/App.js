import React from 'react';
import Datagrid from './datagrid';
import SeurmMapTitle from './ptitle';
import MapLoaction from './selectLoacation'
import SerumMapFooter from './pfooter'
import SerumMapHeader from './pheader'
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';

const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center', 
  padding: '10px' 
};

function App() {
  return (
    <div className="App">
      <div>
        <SerumMapHeader />
      </div>
      <div>
        <SeurmMapTitle />
      </div>
      <div>
        <SnakeFeature />
      </div>
      <div style={containerStyle}>
        <ImageListWithTitle />
      </div>
      <div>
        <MapLoaction />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h1>附近的醫院或衛生所</h1>
      </div>
      <div>
        <Datagrid />
      </div>
      <div>
        <SerumMapFooter />
      </div>
    </div>
  );
}

export default App;
