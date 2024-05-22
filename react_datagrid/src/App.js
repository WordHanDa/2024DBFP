import React from 'react';
import Datagrid from './datagrid';
import SeurmMapTitle from './ptitle';
import MapLoaction from './selectLoacation'

function App() {
  return (
    <div className="App">
      <div>
        <SeurmMapTitle />
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
    </div>
  );
}

export default App;
