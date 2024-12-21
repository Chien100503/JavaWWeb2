import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { loginUser } from "../services/app.js";
import { FaSignInAlt } from "react-icons/fa"; // Import login icon

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      setMessage("Đăng nhập thành công!");
      console.log(response.data); // Xử lý token tại đây

      // Redirect to the list of users page after successful login
      navigate("/users"); // Assuming your users list page is at /users
    } catch (error) {
      setMessage(error.response?.data || "Đăng nhập thất bại!");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to the register page
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Đăng nhập</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="username" placeholder="Tên đăng nhập" value={credentials.username} onChange={handleInputChange} style={styles.input} />
        <input type="password" name="password" placeholder="Mật khẩu" value={credentials.password} onChange={handleInputChange} style={styles.input} />
        <button type="submit" style={styles.button}>
          <FaSignInAlt style={{ marginRight: "8px" }} /> Đăng nhập
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <button onClick={handleRegisterRedirect} style={styles.registerButton}>
        Chưa có tài khoản? Đăng ký ngay
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
    flexDirection: "column",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#2E5077", // Dark blue color for heading
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#2E5077", // Dark blue button color
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    color: "#e74c3c",
    fontSize: "14px",
    marginTop: "20px",
  },
  registerButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#4DA1A9", // Light blue for register button
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Login;
