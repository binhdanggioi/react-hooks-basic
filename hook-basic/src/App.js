import React, {useState} from 'react';
import './App.scss';
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
    const [todoList,setTodoList] = useState([
        {id:1,title:'I love Easy FrontEnd!'},
        {id:2,title:'We love Easy FrontEnd!'},
        {id:3,title:'They love Easy FrontEnd!'}
    ]);

    function handleTodoClick(todo){
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;
        const newTodoList = [ ...todoList];
        newTodoList.splice(index,1);
        setTodoList(newTodoList);
    }
    function handleTodoFormSubmit(formValues) {
        console.log('Form',formValues);
        const newTodo = {
            id: todoList.length + 1,
            ...formValues,
        };
        const newTodoList = [...todoList];
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

  return (
    <div className="App">
      <h1>React Hooks! - Todolist</h1>
        <TodoForm onSubmit={handleTodoFormSubmit}/>
        <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
