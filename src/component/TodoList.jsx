import React, { memo } from "react";
import axios from "axios";
import styled from "styled-components";
import Todo from "./Todo";

const TodoListComponent = styled.div`
  border: 1px solid #eee;
  border-bottom: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

function TodoList({ todos, doneHandler, deleteHandler, screenMode }) {
  return (
    <TodoListComponent>
      {todos.map((v) => (
        <Todo
          data={v}
          key={v.id}
          doneHandler={doneHandler}
          deleteHandler={deleteHandler}
          screenMode={screenMode}
        />
      ))}
    </TodoListComponent>
  );
}

export default memo(TodoList);
