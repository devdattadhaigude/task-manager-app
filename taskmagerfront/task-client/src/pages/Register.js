import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await AuthService.register(username, email, password);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try a different username.");
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "450px" }}>
      <div className="card auth-card p-4">
        <div className="card-body">
          <div className="auth-header mb-4">
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">Start organizing your life today.</p>
          </div>

          {error && <div className="alert alert-danger text-center p-2">{error}</div>}

          <form onSubmit={handleRegister}>
            {/* Username */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="regUsername"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="regUsername">Username</label>
            </div>

            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="regEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="regEmail">Email address</label>
            </div>

            {/* Password */}
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="regPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
              <label htmlFor="regPassword">Password (6+ chars)</label>
            </div>

            <button 
              className="btn btn-primary btn-custom w-100 mb-3" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Creating...</span>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="text-center">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-decoration-none fw-bold" style={{ color: "#667eea" }}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;