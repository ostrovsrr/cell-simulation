import Grid from './Grid';
import { useState } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gridKey, setGridKey] = useState(0);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(15);

  function handleReset() {
    handleStop();
    setGridKey((prevKey) => prevKey + 1);
  }

  function handleStop() {
    setIsPlaying(false);
  }

  function handleDimensionChange(event: any) {
    const { name, value } = event.target;
    const numValue = Number(value);
    if (name == 'width') {
      setWidth(numValue);
    } else if (name == 'height') {
      setHeight(numValue);
    }
    setGridKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      <div className="App">
        <Grid
          key={gridKey}
          isPlaying={isPlaying}
          width={width}
          height={height}
        />
      </div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStop}>Stop</button>
      <input
        name="width"
        type="number"
        onChange={handleDimensionChange}
        value={width}
        placeholder="Width"
        min={0}
        max={100}
      ></input>
      <input
        name="height"
        type="number"
        onChange={handleDimensionChange}
        value={height}
        placeholder="Height"
        min={0}
        max={100}
      ></input>
    </>
  );
}

export default App;
