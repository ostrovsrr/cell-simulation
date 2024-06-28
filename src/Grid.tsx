import './Grid.css';
import Cell from './Cell';
import { useEffect } from 'react';

type GridProps = {
  size: number;
  isPlaying: boolean;
};

export default function Grid({ size, isPlaying }: GridProps) {
  const rows = Array.from({ length: size }, (_, i) => i);
  const cells = Array.from({ length: size }, (_, i) => i);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        console.log('playing...');
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="grid">
      {rows.map((row) => (
        <div key={row} className="row">
          {cells.map((cell) => (
            <Cell key={cell} row={row} cell={cell}></Cell>
          ))}
        </div>
      ))}
    </div>
  );
}
