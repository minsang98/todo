import axios from "axios";
import React, { useState, useCallback, memo, useEffect } from "react";
import styled from "styled-components";
import Footer from "../component/Footer";
import Mode from "../component/Mode";
import Status from "../component/Status";
import TodoInput from "../component/TodoInput";
import TodoList from "../component/TodoList";

import useInput from "../utils/useInput";

const TodoPage = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 8rem;
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${({ screenMode }) => (screenMode ? "#202020" : "#fff")};
  color: ${({ screenMode }) => (screenMode ? "#fff" : "#202020")};
`;
const TodoContainer = styled.div`
  width: 720px;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      height: 3rem;
      display: flex;
      align-items: center;
      padding: 1rem 0;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.25rem;
    }
  }

  @media screen and (max-width: 720px) {
    /* background: red; */
    background: skyblue;
    width: 100vw;
    height: 100vh;
  }
`;

function Todo() {
  const [screenMode, setScreendMode] = useState(false);
  useEffect(() => {
    const localScreenMode = localStorage.getItem("screenMode");
    if (localScreenMode === null) localStorage.setItem("screenMode", false);
    else setScreendMode(localScreenMode === "true" ? true : false);
  }, []);
  const screenModeHandler = useCallback(() => {
    const newScreenMode = !screenMode;
    localStorage.setItem("screenMode", newScreenMode);
    setScreendMode(newScreenMode);
  }, [screenMode]);
  const [todo, todoBind, todoReset] = useInput();
  const [todos, setTodos] = useState([]);
  const todosHandler = useCallback(
    (todo) => {
      const lastId = Math.max(...todos.map((v) => v.id));
      const nextId = lastId !== -Infinity ? lastId + 1 : 0;
      setTodos([...todos, { id: nextId, ...todo }]);
    },
    [todos]
  );
  const doneHandler = useCallback(
    (id) => {
      const newDatas = [...todos].map((v) => {
        if (v.id === id) v.done = !v.done;
        return v;
      });
      const newData = newDatas.filter((v) => v.id === id)[0];
      setTodos(newDatas);
      axios.patch(`http://localhost:3001/todos/${id}`, newData);
    },
    [todos]
  );
  const deleteHandler = useCallback(
    (id) => {
      const newDatas = [...todos].filter((v) => v.id !== id);
      setTodos(newDatas);
      axios.delete(`http://localhost:3001/todos/${id}`);
    },
    [todos]
  );
  useEffect(() => {
    axios.get("http://localhost:3001/todos").then((res) => {
      setTodos(res.data);
    });
  }, []);
  return (
    <TodoPage screenMode={screenMode}>
      <TodoContainer>
        <header>
          <h1>Todo-List</h1>
          <Mode screenMode={screenMode} screenModeHandler={screenModeHandler} />
        </header>

        <TodoInput
          screenMode={screenMode}
          todoBind={todoBind}
          todosHandler={todosHandler}
          todoReset={todoReset}
        />
        {todos && (
          <TodoList
            todos={todos}
            doneHandler={doneHandler}
            deleteHandler={deleteHandler}
            screenMode={screenMode}
          />
        )}
        <Status todos={todos} />
        <Footer />
      </TodoContainer>
    </TodoPage>
  );
}

export default memo(Todo);
