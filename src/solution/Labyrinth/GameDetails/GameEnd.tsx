import React from "react";

export interface Props {
  isGameEnd: number;
  isGameWon: number;
  dispatch: Function;
  payload: Object;
}

const GameEnd = ({ isGameEnd, isGameWon, dispatch, payload }: Props) => {
  return isGameEnd || isGameWon ? (
    <div className="game-end">
      {isGameEnd ? <div>Game has ended</div> : null}
      {isGameWon ? <div> You won the game</div> : <div>You lose!</div>}
      <button
        onClick={() =>
          dispatch({
            type: "reset",
            payload: payload,
          })
        }
      >
        Reset Game
      </button>
    </div>
  ) : null;
};

export default GameEnd;
