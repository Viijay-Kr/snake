import { render, screen } from "@testing-library/react";
import React from "react";
import Snake from "./Snake";
test("renders a nxn grid with cells", () => {
  render(<Snake />);
  const grid = screen.getByTestId("game-grid");
  const newGame = screen.getByTestId("new-game");
  const retry = screen.getByTestId("retry");
  const pause = screen.getByTestId("pause");
  const score = screen.getByTestId("score");
  expect(grid).toBeInTheDocument();
  expect(newGame).toBeInTheDocument();
  expect(pause).toBeInTheDocument();
  expect(retry).toBeInTheDocument();
  expect(score).toBeInTheDocument();
  
});
