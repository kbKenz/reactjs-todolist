import { useState, useEffect } from "react";
import TodoCard from "./components/TodoCard";
import Todoinput from "./components/Todoinput";
import TodoList from "./components/TodoList";

let editID = -1;
function App() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }
  function handleAddTodos(newTodo) {
    console.log(editID);
    if (editID == -1) {
      const newTodoList = [...todos, newTodo];
      persistData(newTodoList);
      setTodos(newTodoList);
    } else {
      console.log(todos[editID]);
      todos[editID] = newTodo;
      console.log(todos[editID]);
      editID = -1;
      persistData(todos);
      // setTodos(newTodoList);
    }
  }
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex != index;
    });
    persistData(newTodoList);

    setTodos(newTodoList);
  }
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    editID = index;
    console.log(editID);
    setTodoValue(valueToBeEdited);

    // persistData(newTodoList);
  }
  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <Todoinput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        todos={todos}
      />
    </>
  );
}
export default App;
