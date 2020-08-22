import React, {useState, useEffect} from 'react';
import queryString from "query-string";
import './App.scss';
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";


//useRef: sẽ tạo ra 1 object,và object này sẽ được giữ nguyên giá trị sau mỗi lần render
function App() {
    const [todoList,setTodoList] = useState([
        {id:1,title:'I love Easy FrontEnd!'},
        {id:2,title:'We love Easy FrontEnd!'},
        {id:3,title:'They love Easy FrontEnd!'}
    ]);

    const [postList,setPostList] = useState([]);

    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 50,
    });

    const [filters,setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
    });

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const {data,pagination} = responseJSON;
                setPostList(data);
                setPagination(pagination);
            }catch (error) {
                console.log(error);
            }
        }
        fetchPostList();
    },[filters]);

    function handlePageChange(newPage) {
        setFilters({...filters,_page:newPage});
    }

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

    function handleFiltersChange(newFilters) {
        console.log('new Filter', newFilters);
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm,
        });
    }

  return (
    <div className="App">
      <h1>React Hooks! - Todolist</h1>
        <PostFiltersForm onSubmit={handleFiltersChange}/>
        <Clock/>
        <PostList posts={postList}/>
        <Pagination pagination={pagination}
        onPageChange={handlePageChange}/>
        {/*<TodoForm onSubmit={handleTodoFormSubmit}/>*/}
        {/*<TodoList todos={todoList} onTodoClick={handleTodoClick}/>*/}
    </div>
  );
}

export default App;
