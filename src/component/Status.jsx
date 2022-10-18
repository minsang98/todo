import React, { memo } from "react";
import styled from "styled-components";

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
`;

function Status({ todos }) {
  // console.log("status");
  const rest = todos.filter((v) => !v.done);
  return (
    <StatusComponent>일정이 {rest.length}개 남아있습니다.</StatusComponent>
  );
}

export default memo(Status);
