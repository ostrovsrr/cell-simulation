import React, { useState, useEffect } from 'react';
import './Grid.css';

interface GridProps {
  size: number;
  isPlaying: boolean;
}

const initializeGrid = (size: number) => {
  const arr = Array.from({ length: size }, () => Array(size).fill(false));
  return arr;
};

const Grid: React.FC<GridProps> = ({ size, isPlaying }) => {
  const [grid, setGrid] = useState(() => initializeGrid(size));

  const handleCellClick = (row: number, col: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((r, i) => r.map((c, j) => (i === row && j === col ? !c : c)))
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
                  val[0] < size &&
                  val[1] >= 0 &&
                  val[1] < size &&
                  !currentGrid[val[0]][val[1]]
                );
              });
              const emptyNeighbor = adjacentCells.some(([x, y]) => {
                return (
                  x >= 0 && x < size && y >= 0 && y < size && !currentGrid[x][y]
                );
              });
              if (cell && emptyNeighbor) {
                const rN =
                  emptyNeighbors[
                    Math.floor(Math.random() * emptyNeighbors.length)
                  ];
                newGrid[rN[0]][rN[1]] = true;
              }
            });
          });
          return newGrid;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, size]);

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
