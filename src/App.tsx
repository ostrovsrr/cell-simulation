import Grid from './Grid';
import { useState } from 'react';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gridKey, setGridKey] = useState<number>(0);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [intervalTime, setIntervalTime] = useState<number>(1);
  const [bacteries, setBacteries] = useState<number>(0);
  const [cycles, setCycles] = useState<number>(0);

  function handlePlay() {
    if (bacteries === 0 && !isPlaying) {
      alert('Place bacteria first');
      return;
    }
    if (bacteries === width * height) {
      alert('No more cells for bacterias!');
      return;
    }
    setIsPlaying(!isPlaying);
  }

  function handleReset() {
    handleStop();
    setBacteries(0);
    setCycles(0);
    setGridKey((prevKey: number) => prevKey + 1);
  }

  function handleStop() {
    setIsPlaying(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    let numValue: number = Number(value) || 0;
    if (name === 'width') {
      numValue = numValue > 100 ? 100 : numValue < 0 ? 0 : numValue;
      setWidth(numValue);
    } else if (name === 'height') {
      numValue = numValue > 100 ? 100 : numValue < 0 ? 0 : numValue;
      setHeight(numValue);
    } else if (name === 'interval') {
      numValue = numValue > 15 ? 15 : numValue < 1 ? 1 : numValue;
      setIntervalTime(numValue);
    }
    setGridKey((prevKey: number) => prevKey + 1);
  }

  return (
    <>
      <h1 className="heading">Cell Growth Simulation</h1>
      <div className="main-container">
        <div className="controllers">
          <button className="grid-cell--button" onClick={handlePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="grid-cell--button" onClick={handleReset}>
            Reset
          </button>
          <input
            name="width"
            type="tel"
            onChange={handleChange}
            value={width}
            placeholder="Width"
            min={0}
            max={100}
            className="grid-cell--input"
          ></input>
          <input
            className="grid-cell--input"
            name="height"
            type="tel"
            onChange={handleChange}
            value={height}
            placeholder="Height"
            min={0}
            max={100}
          ></input>
          <input
            className="grid-cell--input"
            name="interval"
            type="number"
            value={intervalTime}
            onChange={handleChange}
            placeholder="Time interval"
            min={1}
            max={15}
          ></input>
        </div>
        <div>
          <div className="info-container">
            <div className="info-item">
              <p className="info-paragraph">Number of cycles:</p>
              <p className="info-number">{cycles}</p>
            </div>
            <div className="info-item">
              <p className="info-paragraph">Number of bacteries:</p>
              <p className="info-number">{bacteries}</p>
            </div>
          </div>
          <Grid
            key={gridKey}
            isPlaying={isPlaying}
            width={width}
            height={height}
            intervalTime={intervalTime}
            setBacteries={setBacteries}
            bacteries={bacteries}
            handleStop={handleStop}
            cycles={cycles}
            setCycles={setCycles}
          />
        </div>
      </div>
    </>
  );
}

export default App;
