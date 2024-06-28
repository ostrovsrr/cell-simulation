import Grid from './Grid';
import { useState } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gridKey, setGridKey] = useState(0);

  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);

  function handleReset() {
    handleStop();
    setGridKey((prevKey) => prevKey + 1);
  }

  function handleStop() {
    setIsPlaying(false);
  }

  return (
    <>
      <div className="App">
        <Grid key={gridKey} size={20} isPlaying={isPlaying} />
      </div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        Play
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}

export default App;
