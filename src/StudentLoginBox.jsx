import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/newAdmission");

    // ✅ Dummy login check (replace with API call)
    // if (email === "test@example.com" && password === "123456") {
    //   localStorage.setItem("auth", "true");
    //   navigate("/newAdmission");
    // } else {
    //   setError("Invalid credentials. Try test@example.com / 123456");
    // }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid vh-100 d-flex align-items-center">
        <div className="row w-100">
          {/* 🔹 Left Intro Section (hidden on small screens) */}
          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center px-5">
            <h1
              className="fw-bold mb-3"
              style={{ color: "#0d1b2a" }} // dark navy blue
            >
              Student Portal
            </h1>
            <p className="fs-5 text-muted" style={{ maxWidth: "500px" }}>
              Welcome to your all-in-one student portal — a single place to view
              grade reports, pay fees securely, and register for upcoming
              courses with ease. Stay organized and manage your academic journey
              effortlessly.
            </p>
          </div>

          {/* 🔹 Right Login Section */}
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="card shadow-sm bg-light p-4"
              style={{ maxWidth: "400px", width: "100%" }}
            >
              <h3 className="text-center mb-4">Student Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label htmlFor="password" className="form-label mb-0">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="small text-decoration-none"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
