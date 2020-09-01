import React from "react";

import { Solution } from "./solution";

const createCells = (width: number, height: number) => {
  const arr = [];

  for (let i = 0; i < height; i++) {
    const tempArr = [];
    for (let j = 0; j < width; j++) {
      tempArr.push(1);
    }
    arr.push(tempArr);
  }

  return arr;
};

const createRandom = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber);

const createRandomPos = (maxWidth: number, maxHeight: number) => {
  return [createRandom(maxWidth), createRandom(maxHeight)];
};

function App() {
  return (
    <Solution
      targetPosition={[6, 9]}
      availableCells={[
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      ]}
      height={9}
      width={10}
      startingPosition={[4, 4]}
      moveLimit={25}
      cellSize={30}
    />
  );
}

export default App;
