import React, { useState } from "react";
import Cell from "../Cell/Cell";

const array2D = Array.from({ length: 10 }, () => {
  return Array.from({ length: 9 }, () => 0);
});

const BuildLab = () => {
  const [array, modArray] = useState(array2D);

  const modifyArr = (changedColIdx: number, changedRowIdx: number) => {
    modArray((curr2DArray: number[][]) => {
      return curr2DArray.map((array, colIdx) => {
        return array.map((value, rowIdx) => {
          if (changedColIdx === colIdx && changedRowIdx === rowIdx) {
            return Number(!value);
          }
          return value;
        });
      });
    });
  };

  return (
    <div className="game">
      <div className="labyrinth">
        {array.map((arr, colIdx) => {
          const rowCells = arr.map((isValid, rowIdx) => {
            const validClassName = isValid ? "valid" : "";

            return (
              <button
                onClick={() => {
                  modifyArr(colIdx, rowIdx);
                }}
              >
                <Cell
                  key={rowIdx + colIdx}
                  cellSize={20}
                  classesString={`${validClassName}`}
                />
              </button>
            );
          });

          return (
            <div className="row" key={colIdx}>
              {rowCells}
            </div>
          );
        })}
      </div>
      <div className="game-details">
        <h2>Game Options</h2>
      </div>
    </div>
  );
};

export default BuildLab;
