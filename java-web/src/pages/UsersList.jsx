import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/users"); // API endpoint to get users
        setUsers(response.data); // Set users data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Không thể tải dữ liệu người dùng."); // Error message
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the clicked user to state
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null); // Clear selected user data
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Danh sách người dùng</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>STT</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              onClick={() => handleUserClick(user)}
              style={styles.row}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f2f1")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <td style={styles.tableData}>{index + 1}</td>
              <td style={styles.tableData}>{user.username}</td>
              <td style={styles.tableData}>{user.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h3>Chi tiết người dùng</h3>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Full Name:</strong> {selectedUser.fullname}
            </p>
            <button
              onClick={closeModal}
              style={{ ...styles.closeButton, ...styles.closeButtonHover }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3d8c86")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4DA1A9")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// CSS Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7f6", // Light background color for the main container
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#2E5077", // Dark blue for heading
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#2E5077", // Dark blue background for header
    color: "#ffffff", // White text for better contrast
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
  },
  tableData: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    color: "#333", // Dark gray text for table data
    transition: "background-color 0.3s",
  },
  row: {
    transition: "background-color 0.3s",
  },
  rowHover: {
    backgroundColor: "#e0f2f1", // Light teal hover effect on rows
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark backdrop
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "450px",
    maxWidth: "90%", // Ensure modal doesn't exceed screen width
  },
  closeButton: {
    marginTop: "10px",
    backgroundColor: "#4DA1A9", // Teal color for the close button
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  closeButtonHover: {
    backgroundColor: "#3d8c86", // Slightly darker teal on hover
  },
};

export default UsersList;
