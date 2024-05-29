import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter';
import SerumMapHeader from './pheader';
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import ParentComponent from './parentcomponent';

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
        <ParentComponent/>
      </div>
      <div>
        <SerumMapFooter />
      </div>
    </div>
  );
}

export default App;
