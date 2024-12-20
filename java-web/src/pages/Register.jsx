import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    console.log("Data sent to API:", { username, password, fullname });

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/register`, {
        username,
        password,
        fullname,
      });
      console.log("Response from API:", response.data); // Log API response
      alert("Đăng ký thành công!"); // Show success alert

      // After the alert is dismissed, navigate to the login page with a slight delay
      window.setTimeout(() => {
        navigate("/"); // Redirect to the login page
      }, 1000); // 1000ms delay to allow alert to close
    } catch (error) {
      console.error("Error from API:", error.response?.data || error.message); // Log error
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <div style={styles.inputContainer}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="fullname" style={styles.label}>
            Full Name
          </label>
          <input id="fullname" type="text" placeholder="Enter your full name" value={fullname} onChange={(e) => setFullname(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Đang đăng ký..." : "Register"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px 30px",
    borderRadius: "8px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "450px",
    transition: "all 0.3s ease",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "500",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#555",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease, background-color 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default Register;
