import React from "react";
import styled from "styled-components";

export interface Props {
  rows: number;
  columns: number;
  foodPosition: {
    row: number;
    column: number;
  };
  snakeCoordinates: {
    headPosition: {
      row: number;
      column: number;
    };
    bodyCoordinates: {
      count: number;
      coordinates: Array<{
        row: number;
        column: number;
      }>;
    };
  };
}

const Grid: React.FC<Props> = (props) => {
  const {
    rows,
    columns,
    foodPosition,
    snakeCoordinates: {
      headPosition: { row: headYPosition, column: headXPosition },
      bodyCoordinates: { coordinates },
    },
  } = props;

  return (
    <GridWrapper data-testid="game-grid">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <Row key={rowIndex} data-testid="row">
          {Array.from({ length: columns }, (_, columnIndex) => (
            <Cell key={`${columnIndex}-${rowIndex}`} data-testid="grid-cell">
              {foodPosition.row === rowIndex &&
                foodPosition.column === columnIndex && (
                  <Food data-testid={"food"}></Food>
                )}
              {headYPosition === rowIndex && headXPosition === columnIndex && (
                <SnakeHead data-testid="snake-head" />
              )}
              {coordinates.map(
                ({ row, column }) =>
                  row === rowIndex &&
                  column === columnIndex && (
                    <SnakeBody
                      key={`${rowIndex}-${columnIndex}-${row}-${column}`}
                    />
                  )
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </GridWrapper>
  );
};

const GridWrapper = styled.div`
  box-sizing: border-box;
  height: 938px;
  width: 916px;
  border: 8px solid #0d0c0c;
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  margin-bottom: 11px;
`;

const Row = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Food = styled.span`
  height: 14px;
  width: 14px;
  background-color: #dd4f4f;
  border-radius: 50%;
`;

export const SnakeParts = styled.span`
  height: 30px;
  width: 30px;
  opacity: 0.88;
  border-radius: 10px;
`;
export const SnakeHead = styled(SnakeParts)`
  background-color: #2c332d;
`;

export const SnakeBody = styled(SnakeParts)`
  background-color: #d7be18;
`;

export default Grid;
