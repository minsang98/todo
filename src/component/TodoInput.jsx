import React, { useCallback, memo } from "react";
import useInput from "../utils/useInput";
import styled from "styled-components";
import axios from "axios";

const TodoInputComponent = styled.form`
  width: 100%;
  height: 4rem;
  display: flex;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 1.5rem 0;
  /* padding: 1rem; */
  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    margin: 1rem;
    border: none;
    background: ${({ screenMode }) => (screenMode ? "#202020" : "#fff")};
    color: ${({ screenMode }) => (screenMode ? "#fff" : "#202020")};
  }
  button {
    all: unset;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /* background: #eee3cb; */
    font-weight: 700;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

function TodoInput({ screenMode, todosHandler }) {
  const [todo, todoBind, todoReset] = useInput();
  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (todoBind.value) {
        todosHandler({ title: todoBind.value, done: false });
        axios.post("http://localhost:3001/todos", {
          title: todoBind.value,
          done: false,
        });
        todoReset();
      } else {
        alert("입력해주세요");
      }
    },
    [todoBind.value]
  );
  return (
    <TodoInputComponent
      screenMode={screenMode}
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <input placeholder="new Todo.." {...todoBind} />
      <button>+</button>
    </TodoInputComponent>
  );
}

export default memo(TodoInput);
