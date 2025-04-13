import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/userSlice";
import verifyToken from "../../utils/verifyToken";

import "react-toastify/dist/ReactToastify.css";

function Basic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Validate Form Fields
  const validate = () => {
    let newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required!";
    if (!password.trim()) newErrors.password = "Password is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/api/v1//users/token/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data?.data?.access_token) {
        const token = data.data.access_token;
        localStorage.setItem("token", token);

        const isValid = await verifyToken();
        dispatch(loginSuccess(isValid));

        if (isValid.valid) {
          toast.success("Login Successful", {
            onClose: () => navigate("/app"),
            autoClose: 1500, // Automatically close after 1.5s
          });
          
          

        } else {
          toast.error("Invalid token! Please login again.");
        }
      } else {
        toast.error(data?.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3 className="text-center">Sign in</h3>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Basic;
