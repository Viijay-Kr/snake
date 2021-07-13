import { Props as GridProps } from "../../components/Grid/Grid";
import { Direction } from "../hooks/useSnakeGamePlay";
interface Params {
  currentSnakePosition: GridProps["snakeCoordinates"];
  direction: Direction;
  foodPosition: GridProps["foodPosition"];
}
function calculateSnakeCoordinates({
  currentSnakePosition,
  direction,
  foodPosition,
}: Params): GridProps["snakeCoordinates"] & {
  foodEncountered: boolean;
  gameOver: boolean;
} {
  const { headPosition, bodyCoordinates } = currentSnakePosition;
  let newHeadPosition = { ...headPosition };
  let foodEncountered = false;
  let gameOver = false;
  switch (direction) {
    case "ArrowUp": {
      if (
        headPosition.row === 0 ||
        bodyCoordinates.coordinates.find(
          ({ row, column }) =>
            headPosition.row - 1 === row && headPosition.column === column
        )
      ) {
        gameOver = true;
        break;
      }
      // If the snake is moving upwards
      // The head will move one row up in the same column
      newHeadPosition.row = headPosition.row - 1;
      break;
    }
    case "ArrowDown": {
      if (
        headPosition.row === 29 ||
        bodyCoordinates.coordinates.find(
          ({ row, column }) =>
            headPosition.row + 1 === row && headPosition.column === column
        )
      ) {
        // game over here
        gameOver = true;
        break;
      }

      // If the snake is moving upwards
      // The head will move one row up in the same column
      newHeadPosition.row = headPosition.row + 1;
      break;
    }
    case "ArrowLeft": {
      if (
        headPosition.column === 0 ||
        bodyCoordinates.coordinates.find(
          ({ column, row }) =>
            headPosition.column - 1 === column && headPosition.row === row
        )
      ) {
        // game over here
        gameOver = true;
        break;
      }

      // If the snake is moving upwards
      // The head will move one row up in the same column
      newHeadPosition = {
        ...headPosition,
        column: headPosition.column - 1,
      };
      break;
    }
    case "ArrowRight": {
      if (
        headPosition.column === 29 ||
        bodyCoordinates.coordinates.find(
          ({ column, row }) =>
            headPosition.column + 1 === column && headPosition.row === row
        )
      ) {
        gameOver = true;
        break;
      }

      // If the snake is moving upwards
      // The head will move one row up in the same column
      newHeadPosition = {
        ...headPosition,
        column: headPosition.column + 1,
      };
      break;
    }
    default:
      return {
        ...currentSnakePosition,
        foodEncountered,
        gameOver,
      };
  }

  if (gameOver) {
    return {
      ...currentSnakePosition,
      foodEncountered,
      gameOver,
    };
  }

  // The body parts has to follow all the visited cells of head based on the count of body parts
  const newBodyCoordinates = {
    ...bodyCoordinates,
  };
  let prev = { ...headPosition };
  for (let i = 0; i < newBodyCoordinates.count; i++) {
    const currentBodyPart = { ...newBodyCoordinates.coordinates[i] };
    currentBodyPart.row = prev.row;
    currentBodyPart.column = prev.column;
    prev = { ...newBodyCoordinates.coordinates[i] };
    newBodyCoordinates.coordinates[i] = { ...currentBodyPart };
  }

  // Check if head encountered food
  if (
    newHeadPosition.row === foodPosition.row &&
    newHeadPosition.column === foodPosition.column
  ) {
    // Attach a body part and make food encountered true
    newBodyCoordinates.coordinates.push({
      row: prev.row,
      column: prev.column,
    });
    foodEncountered = true;
  }
  return {
    headPosition: newHeadPosition,
    bodyCoordinates: newBodyCoordinates,
    foodEncountered,
    gameOver,
  };
}

export default calculateSnakeCoordinates;
