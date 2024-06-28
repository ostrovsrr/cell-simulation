import Grid from './Grid';
import { useState } from 'react';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      <div className="App">
        <Grid size={20} isPlaying={isPlaying} />
      </div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        Play
      </button>
    </>
  );
}

export default App;
