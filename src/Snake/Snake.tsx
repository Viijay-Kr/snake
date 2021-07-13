import React from "react";
import styled from "styled-components";
import Grid from "../components/Grid/Grid";
import useSnakeGamePlay from "./hooks/useSnakeGamePlay";
interface Props {}

const Snake: React.FC<Props> = () => {
  const { foodPosition, headPosition, bodyCoordinates, score } =
    useSnakeGamePlay();

  return (
    <React.StrictMode>
      <SnakeWrapper>
        <ButtonWrapper>
          <NewGame data-testid="new-game">New Game</NewGame>
          <Retry data-testid="retry">Retry</Retry>
          <Pause data-testid="pause">Pause</Pause>
        </ButtonWrapper>
        <Grid
          foodPosition={foodPosition!}
          rows={30}
          columns={30}
          snakeCoordinates={{
            headPosition,
            bodyCoordinates,
          }}
        />
        <Score data-testid="score">{`Score: ${score}`}</Score>
      </SnakeWrapper>
    </React.StrictMode>
  );
};

const SnakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 938px;
  width: 916px;
  margin: 100px auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 49px;
  width: 147px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 19px;
`;

const NewGame = styled(Button)`
  background-color: #fb0000;
  color: #fff;
`;
const Retry = styled(Button)`
  background-color: #d7be18;
  color: #000;
`;
const Pause = styled(Button)`
  background-color: #464c47;
  color: #fff;
`;

const Score = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
`;

export default Snake;
