import'./App.css'
import SeurmMapTitle from './ptitle';
import SerumMapFooter from './pfooter';
import SerumMapHeader from './pheader';
import SnakeFeature from './snakefeature';
import ImageListWithTitle from './imagelistwithtitle';
import ParentComponent from './parentcomponent';

function App() {
  return (
    <div>
      <div>
        <SerumMapHeader />
      </div>
      <div>
        <SeurmMapTitle />
      </div>
      <div>
        <SnakeFeature />
      </div>
      <div className="containerStyle">
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
