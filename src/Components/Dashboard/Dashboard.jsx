import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";
const Dashboard = ({ user }) => {
  const navigation = useNavigate();
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Task 1",
      time: "Mon, 21 Dec 2020 14:57 GMT",
    },
    {
      id: 2,
      title: "Task 2",
      time: "Mon, 21 Dec 2020 14:57 GMT",
    },
    {
      id: 3,
      title: "Task 3",
      time: "Mon, 21 Dec 2020 14:57 GMT",
    },
  ]);
  useEffect(() => {
    if (!user) {
      navigation("/");
    }
  }, []);
  const getTodos = async () => {
    try {
      const res = await axios.get("/todo");
      setTodos(res.data.todos);
    } catch (err) {
      console.log(err);
    }
    // setTodos(todos.data);
  };
  const deleteTodos = async (id) => {
    try {
      const res = await axios.get(`/todo/${id}`);
      console.log(res);
      if (res.data.success) {
        getTodos();
      }
    } catch (err) {
      console.log(err);
    }
    // setTodos(todos.data);
  };
  const postTodo = async (e) => {
    e.preventDefault();
    if (e.target.todo.value) {
      try {
        const res = await axios.post("/todo", { title: e.target.todo.value });
        if (res.data) {
          getTodos();
          e.target.todo.value = "";
        }
      } catch (err) {
        console.log(err);
      }
    }
    // setTodos(todos.data);
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="dashboard">
      <div className="head">
        <h1>✅ To Do’s</h1>
        <div className="search-cnt">
          <AiOutlineSearch size={20} />
          <input
            className="search-inp"
            type="text"
            name=""
            placeholder="Search"
            id=""
          />
        </div>
      </div>
      <div className="todos">
        {todos.map((todos, i) => (
          <div className="todo" key={i}>
            <div className="todo-box">
              <div className="title">{todos.title}</div>
              <div className="time">{todos.time}</div>
            </div>
            <div className="delete" onClick={() => deleteTodos(todos._id)}>
              <AiOutlineClose size={30} />
            </div>
            <div className="edit">
              <AiOutlineEdit size={30} />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination"></div>
      <form onSubmit={postTodo} className="add-task" method="post">
        <input type="text" name="todo" placeholder="Add new task" id="" />
        <button type="submit">
          <AiOutlinePlus size={25} />
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
