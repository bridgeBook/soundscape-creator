import './App.css';
import MixPlayer from './MixPlayer';
import SelectPlayer from "./SelectPlayer";

function App() {
  return (
    <div className="App">
      <h1>Soundscape Creator</h1>
      <SelectPlayer />
      <MixPlayer />
    </div>
  );
}


export default App;
