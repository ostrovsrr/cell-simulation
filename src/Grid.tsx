import React, { useState, useEffect } from 'react';
import './Grid.css';

interface GridProps {
  isPlaying: boolean;
  width: number;
  height: number;
  intervalTime: number;
  setBacteries: React.Dispatch<React.SetStateAction<number>>;
  bacteries: number;
}

const initializeGrid = (width: number, height: number) => {
  const arr = Array.from({ length: height }, () => Array(width).fill(false));
  return arr;
};

const Grid: React.FC<GridProps> = ({
  isPlaying,
  width,
  height,
  intervalTime,
  setBacteries,
  bacteries,
}) => {
  const [grid, setGrid] = useState(() => initializeGrid(width, height));
  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, i) =>
        r.map((c, j) => {
          if (i === row && j === col) {
            if (!c) {
              setBacteries(bacteries + 1);
            } else {
              setBacteries(bacteries - 1);
            }
            return !c;
          } else {
            return c;
          }
        })
      )
    );
  };

  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      interval = setInterval(() => {
        console.log('playing...');
        setGrid((currentGrid) => {
          const newGrid = currentGrid.map((row) => [...row]);
          currentGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
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
              const emptyNeighbor = adjacentCells.some(([x, y]) => {
                return (
                  x >= 0 &&
                  x < height &&
                  y >= 0 &&
                  y < width &&
                  !currentGrid[x][y]
                );
              });
              if (cell && emptyNeighbor) {
                const rN =
                  emptyNeighbors[
                    Math.floor(Math.random() * emptyNeighbors.length)
                  ];
                newGrid[rN[0]][rN[1]] = true;
                // setBacteries(bacteries + 1); does not work properly
              }
            });
          });
          return newGrid;
        });
      }, intervalTime * 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, width, height]);

  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={j}
              className="cell"
              style={{ backgroundColor: cell ? '#4CAF50' : '#fff' }}
              onClick={() => handleCellClick(i, j)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
