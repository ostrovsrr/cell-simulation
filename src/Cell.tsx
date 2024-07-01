// import { useState } from 'react';

// type CellProps = {
//   key: React.Key;
//   row: number;
//   cell: number;
// };

// export default function Cell({ row, cell }: CellProps) {
//   const [isClicked, setIsClicked] = useState(false);
//   console.log(row, cell);
//   return (
//     <div
//       className={`cell ${isClicked ? 'occupied' : ''}`}
//       onClick={() => {
//         setIsClicked(!isClicked);
//       }}
//     ></div>
//   );
// }
