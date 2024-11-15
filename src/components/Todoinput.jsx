import React, { useState } from "react";

export default function Todoinput(props) {
  const { handleAddTodos, todoValue, setTodoValue } = props;
  return (
    <header>
      <input
        value={todoValue}
        onChange={(e) => {
          setTodoValue(e.target.value);
        }}
        placeholder="Enter todo..."
      />
      <button
        onClick={() => {
          if (todoValue.trim() != "") {
            handleAddTodos(todoValue.trim());
          }
          setTodoValue("");
        }}
      >
        Add
      </button>
    </header>
  );
}
