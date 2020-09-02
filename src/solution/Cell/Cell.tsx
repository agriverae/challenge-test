import React from "react";

export interface Props {
  cellSize: number;
  classesString?: String;
}

const Cell = ({ cellSize, classesString = "" }: Props) => {
  return (
    <div
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
      className={`cell ${classesString}`}
    ></div>
  );
};

export default Cell;
