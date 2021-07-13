import { useCallback, useEffect, useRef, useState } from "react";
import { Props as GridProps } from "../../components/Grid/Grid";
import calculateSnakeCoordinates from "../utils/calculateSnakeCoordinates";

export type Direction =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "";

export type SnakeState = GridProps["snakeCoordinates"] & {
  currentDirection: Direction;
  foodPosition?: GridProps["foodPosition"];
  score: number;
};
const initialSnakeState: SnakeState = {
  headPosition: {
    row: 2,
    column: 2,
  },
  bodyCoordinates: {
    count: 1,
    coordinates: [
      {
        row: 2,
        column: 1,
      },
    ],
  },
  score: 0,
  currentDirection: "ArrowRight",
};
const initialFoodPosition = getFoodPosition(initialSnakeState);
export default function useSnakeGamePlay() {
  const snakeStateRef = useRef<SnakeState>({
    ...initialSnakeState,
    foodPosition: initialFoodPosition,
  });
  const [snakeState, setSnakeState] = useState(snakeStateRef.current);
  const timer = useRef<number>();
  const controlSnakeMovement = useCallback((direction: Direction) => {
    if (direction !== snakeStateRef.current.currentDirection) {
      clearInterval(timer.current);
    }
    const { headPosition, bodyCoordinates, foodEncountered, gameOver } =
      calculateSnakeCoordinates({
        currentSnakePosition: snakeStateRef.current,
        direction,
        foodPosition: snakeStateRef.current.foodPosition!,
      });
    snakeStateRef.current.headPosition = headPosition;
    snakeStateRef.current.bodyCoordinates = bodyCoordinates;
    snakeStateRef.current.currentDirection = direction;
    if (foodEncountered) {
      snakeStateRef.current.bodyCoordinates.count++;
      snakeStateRef.current.foodPosition = getFoodPosition(
        snakeStateRef.current
      );
      snakeStateRef.current.score = Math.floor(
        snakeStateRef.current.bodyCoordinates.count * 1.2
      );
    }
    if (gameOver) {
      snakeStateRef.current = {
        headPosition: {
          row: 2,
          column: 2,
        },
        bodyCoordinates: {
          count: 1,
          coordinates: [
            {
              row: 2,
              column: 1,
            },
          ],
        },
        foodPosition: getFoodPosition(initialSnakeState),
        score: initialSnakeState.score,
        currentDirection: initialSnakeState.currentDirection,
      };
      clearInterval(timer.current);
    }
    setSnakeState({
      ...snakeStateRef.current,
    });
  }, []);

  useEffect(() => {
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key === snakeStateRef.current.currentDirection) {
          return;
        }
        if (e.key !== snakeStateRef.current.currentDirection) {
          clearInterval(timer.current);
        }
        controlSnakeMovement(e.key as Direction);
      },
      false
    );
    return () => {
      window.removeEventListener("keyup", (f) => f);
    };
  }, [controlSnakeMovement]);

  useEffect(() => {
    if (snakeState.currentDirection) {
      timer.current = window.setInterval(() => {
        controlSnakeMovement(snakeState.currentDirection);
      }, 200);
    }
  }, [controlSnakeMovement, snakeState.currentDirection]);

  return snakeState;
}

export function getFoodPosition(
  snakePosition: GridProps["snakeCoordinates"]
): GridProps["foodPosition"] {
  const {
    headPosition: { row: headY, column: headX },
    bodyCoordinates: { coordinates },
  } = snakePosition;
  // FoodY should discard headY and collection of bodyY
  const possibleFoodYPositions = Array.from(
    { length: 30 },
    (_, index) => index
  ).filter((index) => {
    return index !== headY && !coordinates.find(({ row }) => row === index);
  });
  // FoodX should discard headX and collection of bodyX
  const possibleFoodXPositions = Array.from(
    { length: 30 },
    (_, index) => index
  ).filter(
    (index) =>
      index !== headX && !coordinates.find(({ column }) => index === column)
  );
  return {
    row: possibleFoodYPositions[
      Math.floor(Math.random() * possibleFoodYPositions.length)
    ],
    column:
      possibleFoodXPositions[
        Math.floor(Math.random() * possibleFoodXPositions.length)
      ],
  };
}
