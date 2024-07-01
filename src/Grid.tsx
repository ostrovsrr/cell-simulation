import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
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

interface CellPosition {
  row: number;
  col: number;
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
  const initializeGrid = useCallback(
    (width: number, height: number): boolean[][] => {
      return Array.from({ length: height }, () => Array(width).fill(false));
    },
    []
  );

  const [grid, setGrid] = useState<boolean[][]>(() =>
    initializeGrid(width, height)
  );

  const initializeRotationGrid = useCallback(
    (width: number, height: number): number[][] => {
      return Array.from({ length: height }, () =>
        Array.from({ length: width }, () => Math.floor(Math.random() * 180))
      );
    },
    []
  );

  const [rotationGrid] = useState<number[][]>(() =>
    initializeRotationGrid(width, height)
  );

  const computeNewGrid = useCallback(
    (currentGrid: boolean[][]): boolean[][] => {
      const newGrid = currentGrid.map((row) => [...row]);
      currentGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          const adjacentCells: CellPosition[] = [
            { row: i - 1, col: j },
            { row: i + 1, col: j },
            { row: i, col: j - 1 },
            { row: i, col: j + 1 },
          ];
          const emptyNeighbors = adjacentCells.filter(({ row, col }) => {
            return (
              row >= 0 &&
              row < height &&
              col >= 0 &&
              col < width &&
              !currentGrid[row][col]
            );
          });
          if (cell && emptyNeighbors.length > 0) {
            const randomNeighbor =
              emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)];
            newGrid[randomNeighbor.row][randomNeighbor.col] = true;
          }
        });
      });
      return newGrid;
    },
    [width, height]
  );

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        console.log('playing...');
        setCycles((prev) => prev + 1);
        setGrid((currentGrid) => computeNewGrid(currentGrid));
      }, intervalTime * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, intervalTime, computeNewGrid]);

  useEffect(() => {
    setGrid(initializeGrid(width, height));
  }, [width, height, initializeGrid]);

  useEffect(() => {
    const bacCount = grid.flat().filter((cell) => cell).length;
    setBacteries(bacCount);
    if (bacCount === width * height) {
      handleStop();
    }
  }, [grid, width, height, setBacteries, handleStop]);

  const soundRef = useRef<HTMLAudioElement>(null);
  const playSound = useCallback(
    (audioRef: React.RefObject<HTMLAudioElement>, volume: number = 1) => {
      if (audioRef.current) {
        const sound = audioRef.current.cloneNode(true) as HTMLAudioElement;
        sound.volume = volume;
        sound.play();
      }
    },
    []
  );

  const handleCellClick = useCallback(
    (row: number, col: number) => {
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
    },
    [playSound]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, row: number, col: number) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleCellClick(row, col);
      }
    },
    [handleCellClick]
  );

  return (
    <div className="grid-container">
      {grid.map((row, i) => (
        <div key={i} className="grid-row">
          {row.map((cell, j) => (
            <GridCell
              key={j}
              isActive={cell}
              rotation={rotationGrid[i][j]}
              onClick={() => handleCellClick(i, j)}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
                handleKeyDown(event, i, j)
              }
            />
          ))}
        </div>
      ))}
      <audio ref={soundRef} src="./src/assets/sounds/pop.mp3" />
    </div>
  );
};

const GridCell = memo(
  ({
    isActive,
    rotation,
    onClick,
    onKeyDown,
  }: {
    isActive: boolean;
    rotation: number;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  }) => (
    <div
      tabIndex={0}
      className={`grid-cell ${isActive ? 'grid-cell--active' : ''}`}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {isActive && (
        <img
          src="./src/assets/images/bacteria.png"
          className="grid-image"
          style={{ transform: `rotate(${rotation}deg)` }}
          alt="Bacteria"
        />
      )}
    </div>
  )
);

export default Grid;
