import React from "react";

export interface Props {
  moveLimit: number;
  movesLeft: number;
}

const GameDetails = ({ moveLimit, movesLeft }: Props) => {
  return (
    <div className="game-details">
      <h2>Game Details</h2>
      <p>Total Moves: {moveLimit}</p>
      <p>Moves Left: {movesLeft}</p>
    </div>
  );
};

export default GameDetails;
