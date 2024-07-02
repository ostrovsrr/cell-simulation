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
  const [errorMessage, setErrorMessage] = useState<string>('');

  function handlePlay() {
    if (bacteries === 0 && !isPlaying) {
      setErrorMessage('Place bacteria first');
      return;
    } else if (bacteries === width * height) {
      setErrorMessage('No more cells for bacterias!');
      return;
    } else {
      setErrorMessage('');
    }
    setIsPlaying(!isPlaying);
  }

  function handleReset() {
    handleStop();
    setBacteries(0);
    setCycles(0);
    setErrorMessage('');
    setGridKey((prevKey: number) => prevKey + 1);
  }

  function handleStop() {
    setIsPlaying(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const cleanedValue = value.replace(/[^0-9]/g, '');
    let numValue = Number(cleanedValue) || 0;

    if (name === 'width' && (numValue < 0 || numValue > 50)) {
      setErrorMessage('Width can be from 0 to 50');
      return;
    } else if (name === 'height' && (numValue < 0 || numValue > 50)) {
      setErrorMessage('Height can be from 0 to 50');
      return;
    } else if (name === 'interval' && (numValue < 1 || numValue > 10)) {
      setErrorMessage('Interval can be from 1.0 to 10.0 seconds');
      return;
    } else {
      setErrorMessage('');
      if (name === 'width') setWidth(numValue);
      if (name === 'height') setHeight(numValue);
      if (name === 'interval') setIntervalTime(numValue);
      setGridKey((prevKey) => prevKey + 1);
    }
  }

  return (
    <>
      <h1 className="heading">Cell Growth Simulation</h1>
      <div className="main-container">
        <div className="controllers">
          <button
            className="grid-cell--button"
            onClick={handlePlay}
            aria-pressed={isPlaying}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="grid-cell--button"
            onClick={handleReset}
            role="button"
          >
            Reset
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="width-input" className="grid-cell--label">
            Grid Width:
            <input
              id="width-input"
              name="width"
              type="number"
              onChange={handleChange}
              value={width}
              placeholder="Width"
              min={0}
              max={50}
              aria-valuemin={0}
              aria-valuemax={50}
              aria-valuenow={width}
              className="grid-cell--input"
            />
          </label>

          <label htmlFor="height-input" className="grid-cell--label">
            Grid Height:
            <input
              id="height-input"
              className="grid-cell--input"
              name="height"
              type="number"
              onChange={handleChange}
              value={height}
              placeholder="Height"
              min={0}
              max={50}
              aria-valuemin={0}
              aria-valuemax={50}
              aria-valuenow={height}
            />
          </label>

          <label htmlFor="interval-input" className="grid-cell--label">
            Division Interval in sec:
            <input
              id="interval-input"
              className="grid-cell--input"
              name="interval"
              type="number"
              value={intervalTime}
              onChange={handleChange}
              placeholder="Time interval"
              min={1}
              max={10}
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={intervalTime}
            />
          </label>
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
