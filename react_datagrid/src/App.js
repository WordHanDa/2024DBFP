import Datagrid from './datagrid'
import HelloCGU from './cgu_hello'

function App() {
  return (
    <div className="App"> 
    <div> 
      { HelloCGU() }
    </div>
    <div>
      { Datagrid() } 
    </div>
    </div>
  );
}

export default App;
