import { render, screen } from "@testing-library/react";
import React from "react";
import Grid, { Props as GridProps } from "./Grid";
const gridProps: GridProps = {
  rows: 10,
  columns: 10,
  foodPosition: {
    row: 4,
    column: 4,
  },
  snakeCoordinates: {
    headPosition: {
      row: 2,
      column: 1,
    },
  },
};
test("renders a nxn grid with cells", () => {
  render(<Grid {...gridProps} />);
  const cells = screen.getAllByTestId("grid-cell");
  expect(cells.length).toBe(100);
});

test("renders food at given row and column index", () => {
  render(<Grid {...gridProps} />);
  const food = screen.getByTestId("food");
  const rows = screen.getAllByTestId("row");
  const row = rows[4];
  const cell = row.childNodes[4];
  expect(cell.firstChild).toBe(food);
});

test("renders snake head in the specified snake coordinates", () => {
  render(<Grid {...gridProps} />);
  const rows = screen.getAllByTestId("row");
  const snake = screen.getAllByTestId("snake-head");
  const row = rows[2];
  const cell = row.childNodes[1];
  expect(cell.firstChild).toBe(snake[0]);
});

test("renders snake body in the specified snake coordinates", () => {
  render(<Grid {...gridProps} />);
  const rows = screen.getAllByTestId("row");
  const snakeBody = screen.getAllByTestId("snake-body");
  const row = rows[2];
  const cell = row.childNodes[0];
  expect(cell.firstChild).toBe(snakeBody[0]);
});
