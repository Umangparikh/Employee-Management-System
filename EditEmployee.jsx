import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [designation, setDesignation] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchOneDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/employee/edit/${id}`
      );
      setFirstName(response.data.result.firstName);
      setLastName(response.data.result.lastName);
      setEmail(response.data.result.email);
      setContact(response.data.result.contact);
      setDesignation(response.data.result.designation);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOneDetails();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { email, contact, designation }; 
      await axios.put(
        `http://127.0.0.1:5000/employee/update/${id}`,
        data
      );
      alert("Your Record Updated Successfully");
      navigate("/allemployees");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="edit-employee-container">
      <h2 className="edit-employee-title">Edit Employee</h2>
      <form onSubmit={submitHandler} className="edit-employee-form">
        <div>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={firstName}
            readOnly // 👈 cannot be edited
          />
        </div>

        <div>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lastName}
            readOnly // 👈 cannot be edited
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEmployee;
