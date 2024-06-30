import Grid from './Grid';
import { useState } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gridKey, setGridKey] = useState(0);
  const [width, setWidth] = useState<number>(20);
  const [height, setHeight] = useState<number>(20);
  const [interval, setInterval] = useState<number>(1);
  const [bacteries, setBacteries] = useState<number>(0);

  function handleReset() {
    handleStop();
    setGridKey((prevKey) => prevKey + 1);
  }

  function handleStop() {
    setIsPlaying(false);
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    const numValue = Number(value);
    if (name == 'width') {
      setWidth(numValue);
    } else if (name == 'height') {
      setHeight(numValue);
    } else if (name === 'interval') {
      setInterval(numValue);
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
          intervalTime={interval}
          setBacteries={setBacteries}
          bacteries={bacteries}
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
        onChange={handleChange}
        value={width}
        placeholder="Width"
        min={0}
        max={100}
      ></input>
      <input
        name="height"
        type="number"
        onChange={handleChange}
        value={height}
        placeholder="Height"
        min={0}
        max={100}
      ></input>
      <input
        name="interval"
        type="number"
        value={interval}
        onChange={handleChange}
        placeholder="Time interval"
        min={1}
        max={15}
      ></input>
      <p>Time elapsed:</p>
      <p>Number of bacteries:</p>
      <p>{bacteries}</p>
    </>
  );
}

export default App;
