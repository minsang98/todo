import React, { memo, useState, useRef } from "react";
import styled from "styled-components";
import { BsCheckSquareFill, BsCheckSquare, BsPencil } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";

const TodoComponent = styled.div`
  width: 100%;
  .todo {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      font-weight: 700;
      margin: 1rem;
      border: none;
      /* background: ${({ screenMode }) => (screenMode ? "#202020" : "#fff")};
      color: ${({ screenMode }) => (screenMode ? "#fff" : "#202020")}; */
    }
    &.done {
      span {
        color: ${({ screenMode }) => (screenMode ? "#B2B2B2" : "#B2B2B2")};
        text-decoration: line-through;
      }
    }
    .action-icons {
      font-size: 1.25rem;
      display: flex;
      .action-icon {
        cursor: pointer;
        margin: 0.5rem;
      }
    }
  }
`;

function Todo({ data, doneHandler, deleteHandler, screenMode }) {
  const { title, done, id } = data;
  const [change, setChange] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef();
  const changeHandler = () => {
    data.title = newTitle;
    axios.patch(`http://localhost:3001/todos/${id}`, data);
  };
  return (
    <TodoComponent screenMode={screenMode}>
      <div className={done ? "todo done" : "todo"}>
        <span>
          {change ? (
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              ref={inputRef}
            />
          ) : (
            title
          )}
        </span>
        <div className="action-icons">
          <div
            className="action-icon"
            onClick={() => {
              setChange(!change);
              inputRef.current.focus();
              if (change) {
                changeHandler();
              }
            }}
          >
            <BsPencil />
          </div>
          <div className="action-icon complete" onClick={() => doneHandler(id)}>
            {done ? <BsCheckSquareFill /> : <BsCheckSquare />}
          </div>
          <div className="action-icon delete" onClick={() => deleteHandler(id)}>
            <TiDeleteOutline />
          </div>
        </div>
      </div>
    </TodoComponent>
  );
}

export default memo(Todo);
