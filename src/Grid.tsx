import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';

interface GridProps {
  isPlaying: boolean;
  width: number;
  height: number;
  intervalTime: number;
  setBacteries: React.Dispatch<React.SetStateAction<number>>;
  bacteries: number;
  cycles: number;
  setCycles: React.Dispatch<React.SetStateAction<number>>;
  handleStop: () => void;
}

const Grid: React.FC<GridProps> = ({
  isPlaying,
  width,
  height,
  intervalTime,
  setBacteries,
  handleStop,
  setCycles,
}) => {
  const initializeGrid = (width: number, height: number) => {
    const arr = Array.from({ length: height }, () => Array(width).fill(false));
    return arr;
  };
  const [grid, setGrid] = useState(() => initializeGrid(width, height));

  const soundRef = useRef<HTMLAudioElement>(null);
  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((c, j) => {
          if (i === row && j === col) {
            playSound(soundRef, 0.2);
            return !c;
          } else {
            return c;
          }
        })
      )
    );
  };

  const initializeRotationGrid = (width: number, height: number) => {
    const arr = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => Math.floor(Math.random() * 180))
    );
    return arr;
  };

  const [rotationGrid, setRotationGrid] = useState(() =>
    initializeRotationGrid(width, height)
  );

  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = setInterval(() => {
        console.log('playing...');
        setCycles((prev) => prev + 1);
        setGrid((currentGrid) => {
          const newGrid = currentGrid.map((row) => [...row]);
          let newBacteriesCount = 0;
          currentGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
              // for current grid every single cell
              // calculate the neighbor cells
              const adjacentCells = [
                [i - 1, j],
                [i + 1, j],
                [i, j - 1],
                [i, j + 1],
              ];
              const emptyNeighbors = adjacentCells.filter((val) => {
                return (
                  val[0] >= 0 &&
                  val[0] < height &&
                  val[1] >= 0 &&
                  val[1] < width &&
                  !currentGrid[val[0]][val[1]]
                );
              });
              if (cell && emptyNeighbors.length > 0) {
                const randomNeighbor =
                  emptyNeighbors[
                    Math.floor(Math.random() * emptyNeighbors.length)
                  ];
                newGrid[randomNeighbor[0]][randomNeighbor[1]] = true;
                newBacteriesCount += 1;
              }
            });
          });

          return newGrid;
        });
      }, intervalTime * 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, width, height, intervalTime, setBacteries]);

  useEffect(() => {
    setGrid(initializeGrid(width, height));
  }, [width, height]);

  const playSound = (
    audioRef: React.RefObject<HTMLAudioElement>,
    volume: number = 1
  ) => {
    if (audioRef.current) {
      const sound = audioRef.current.cloneNode(true) as HTMLAudioElement;
      sound.volume = volume;
      sound.play();
    }
  };

  useEffect(() => {
    const bacCount = grid.flat().filter((cell) => cell).length;
    setBacteries(bacCount);
    if (bacCount === width * height) {
      handleStop();
    }
  }, [grid, setBacteries]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCellClick(row, col);
    }
  };

  return (
    <div className="grid-container">
      {grid.map((row, i) => (
        <div key={i} className="grid-row">
          {row.map((cell, j) => (
            <div
              key={j}
              tabIndex={0}
              className={`grid-cell ${cell ? 'grid-cell--active' : ''}`}
              onKeyDown={(event) => handleKeyDown(event, i, j)}
              onClick={() => handleCellClick(i, j)}
            >
              {cell && (
                <img
                  src="./src/assets/images/bacteria.png"
                  className="grid-image"
                  style={{ transform: `rotate(${rotationGrid[i][j]}deg)` }}
                  alt="Bacteria"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <audio ref={soundRef} src="./src/assets/sounds/pop.mp3" />
    </div>
  );
};

export default Grid;
