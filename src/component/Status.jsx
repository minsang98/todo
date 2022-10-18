import React, { memo } from "react";
import styled from "styled-components";
import axios from "axios";

const StatusComponent = styled.div`
  width: 100%;
  height: 3rem;
  border: 1px solid #eee;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
  padding: 1rem;
  color: #bbbbbb;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  .clear {
    cursor: pointer;
  }
`;

function Status({ todos, clear }) {
  const rest = todos.filter((v) => !v.done);

  return (
    <StatusComponent>
      <span>일정이 {rest.length}개 남아있습니다.</span>
      <span className="clear" onClick={clear}>
        CLEAR
      </span>
    </StatusComponent>
  );
}

export default memo(Status);
