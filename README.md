Bacteria Cell Simulation
This project shows the spread of bacteria within a customizable grid. Users can start or reset the simulation at any time, providing control over observing the life cycle of bacteria in different cycles.

Features
Play/Reset the Simulation
Cycle and Population Tracking by Number of cycles and Number of bacterias
Customizable grid width and height
Control the division interval
Interact with bacteria directly - click on cell to add/remove bacteria
Sound effects - click on bacteria or cell to enable pop sound
Mobile responsiveness

Instruction to run the project locally:
Prerequisites:

1. Installed Node.js and npm
2. Installed editor e.g. VSCODE

Instruction:

1. Download ZIP file with the project, extract file
2. Open terminal and navigate to the extracted location
3. Run "npm i" to install dependencies
4. Run "npm run dev" and navigate to the address provided via browser- "http://localhost:5174/cell-simulation/"

Technologies Used:
Vite with React: App parent component with Grid component.
Hooks: useState and useEffect, useRef for sound effects, useMemo for performance
React Developer Tools
TypeScript with Strict Mode On for type safety
Error Handling and user feedback
Github pages for deployment

Performance Analysis:
Simulation when user puts a single bacteria in the corner will take 18 cycles to occupy the entire grid. Using React Developer Tools Profiler, let's analyze rerender time. It takes 39 commits which render time vary from 1.9 ms to 4.2ms. memo and useCallback were utilized to improve performance.

![Fastest commit](src\assets\images\ss1.png)
![Slowest commit](src\assets\images\ss2.png)
