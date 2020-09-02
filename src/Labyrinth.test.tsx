import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Labyrinth } from "./solution/Labyrinth";
import { Props } from "./solution/Labyrinth/Labyrinth";

describe("Labyrinth", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });

  it("should win", () => {
    const { container, queryByText } = render(<Labyrinth {...props} />);
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowDown" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    expect(queryByText("You won the game")).toBeTruthy();
    expect(queryByText("You lose!")).not.toBeTruthy();
  });

  it("should lose", () => {
    const { container, queryByText } = render(
      <Labyrinth {...props} moveLimit={2} />
    );
    fireEvent.keyDown(container, { key: "ArrowRight" });
    fireEvent.keyDown(container, { key: "ArrowRight" });
    expect(queryByText("You won the game")).not.toBeTruthy();
    expect(queryByText("You lose!")).toBeTruthy();
  });
});
