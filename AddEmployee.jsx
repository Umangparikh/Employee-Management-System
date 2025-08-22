import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setDesignation("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { firstName, lastName, email, contact, designation };
      await axios.post("http://127.0.0.1:5000/employee/store", data);
      alert("New Employee Added Successfully");
      resetForm();
      navigate("/allemployees");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add-employee-container">
      <h2 className="add-employee-title">Add New Employee</h2>
      <form onSubmit={submitHandler} className="add-employee-form">
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddEmployee;
