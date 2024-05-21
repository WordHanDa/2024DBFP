import React from 'react';
import Datagrid from './datagrid';
import HelloCGU from './cgu_hello';
import MapBody from './map';

function App() {
  return (
    <div className="App">
      <div>
        <HelloCGU />
      </div>
      <div>
        <Datagrid />
      </div>
      <div>
        <MapBody />
      </div>
    </div>
  );
}

export default App;
