import React, { memo } from "react";
import styled from "styled-components";
import { BsCheckSquareFill, BsCheckSquare } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

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

  return (
    <TodoComponent screenMode={screenMode}>
      <div className={done ? "todo done" : "todo"}>
        <span>{title}</span>
        <div className="action-icons">
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
