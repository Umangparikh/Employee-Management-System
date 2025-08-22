import React from "react";
import AddEmployee from "./AddEmployee";
import AllEmployees from "./AllEmployees";
import EditEmployee from "./EditEmployee";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* Header */}
      <div className="header">
        <h1 className="logo">Employee Management System</h1>
        <Link to="/addemployee" className="btn-add">
          + Add Employee
        </Link>
      </div>

      {/* Main Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<AllEmployees />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/allemployees" element={<AllEmployees />} />
          <Route path="/editemployee/:id" element={<EditEmployee />} />
        </Routes>
      </div>

      {/* Footer */}
      <div className="footer">
        <h3 align="center">EMS&copy;2025. All Rights Reserved</h3>
      </div>
    </>
  );
}

export default App;