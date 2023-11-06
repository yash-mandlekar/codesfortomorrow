import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import "./App.css";
import axios from "./Axios.js";
const App = () => {
  const [user, setuser] = useState(null);
  const loaduser = async () => {
    try {
      const response = await axios.get("/loaduser");
      setuser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loaduser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Dashboard user={user} /> : <Login setuser={setuser} />
          }
        />
        <Route path="/signup" element={<Signup setuser={setuser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
