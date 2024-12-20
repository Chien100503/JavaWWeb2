import axios from "axios";

// Tạo một instance của axios
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Địa chỉ API backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Phương thức API
const registerUser = (userData) => api.post("/register", userData); // API đăng ký
const loginUser = (credentials) => api.post("/login", credentials); // API đăng nhập
const getUsers = () => api.get("/users"); // API lấy danh sách người dùng
const getUserById = (id) => api.get(`/users/${id}`); // API lấy thông tin người dùng theo ID
const deleteUser = (id) => api.delete(`/users/${id}`); // API xóa người dùng

export { registerUser, loginUser, getUsers, getUserById, deleteUser };
