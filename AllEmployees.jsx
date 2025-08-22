import axios from "axios";
import React, { useEffect, useState } from "react";

function AllEmployees() {
  const [result, setResult] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/employee/all");
      setResult(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/employee/delete/${id}`);
      fetchAllEmployees();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">All Employees</h2>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
          {result.map((row) => (
            <React.Fragment key={row._id}>
              {/* Main Row */}
              <tr
                className={expandedRow === row._id ? "expanded" : ""}
                onClick={() => toggleExpand(row._id)}
              >
                <td>{row._id}</td>
                <td>{row.firstName} {row.lastName}</td>
                <td>{row.designation}</td>
                <td>
                  {/* Edit button */}
                  <a
                    href={`/editemployee/${row._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-edit"
                  >
                    Edit
                  </a>

                  {/* Delete button */}
                  <button
                  onClick={(e) => {e.stopPropagation();
                  if (window.confirm("Are you sure you want to delete this employee?")) {
                  deleteRecord(row._id);
                    }
                  }}
                  className="btn btn-delete"
                >
                  Delete
                </button>
                </td>
              </tr>

              {/* Expandable details */}
              {expandedRow === row._id && (
                <tr className="expand-row">
                  <td colSpan="4">
                    <div className="expand-details">
                      <p><strong>Contact:</strong> {row.contact}</p>
                      <p><strong>City:</strong> {row.city || "N/A"}</p>
                      <p><strong>Email:</strong> {row.email}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEmployees;
