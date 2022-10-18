import React, { memo } from "react";
import styled from "styled-components";
import { BsSun } from "react-icons/bs";
import { MdNightlightRound } from "react-icons/md";
const ModeComponent = styled.div`
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 0.5rem;
  font-weight: 700;
  background: ${({ screenMode }) => (screenMode ? "#202020" : "#fff")};
  color: ${({ screenMode }) => (screenMode ? "#fff" : "#202020")};
  :hover {
    background: ${({ screenMode }) => (screenMode ? "#a5a3a3" : "#202020")};
    color: ${({ screenMode }) => (screenMode ? "#fff" : "#eee")};
  }
`;

function Mode({ screenMode, screenModeHandler }) {
  console.log("mode");
  return (
    <ModeComponent onClick={screenModeHandler} screenMode={screenMode}>
      {screenMode ? <BsSun /> : <MdNightlightRound />} Mode
    </ModeComponent>
  );
}

export default memo(Mode);
