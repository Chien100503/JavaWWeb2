import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import UsersList from "./pages/UsersList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register page */}
        <Route path="/users" element={<UsersList />} /> {/* List of users page */}
      </Routes>
    </Router>
  );
}

export default App;
