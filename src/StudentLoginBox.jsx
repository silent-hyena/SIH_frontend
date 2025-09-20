import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import AutoDismissAlert from "./AutoDismissedAlert";

export default function StudentLogin() {
  const navigate = useNavigate();
 
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState("success")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {

    const response = await fetch("https://site--sih-project-backend-service--kg8rzzj68k4g.code.run/student/portallogin", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const Data = await response.json();
    if (Data.status == "success") {
      navigate("/")
      // console.log(Data)
    }
    else {
      setAlertMessage(Data.alert)
      setAlertType("failue")
      setAlert(true);
    }

  }

  return (
    <>
      {alert && <AutoDismissAlert message={alertMessage} type={alertType} onClose={() => setAlert(false)} />}
      <Navbar />
      <div className="container-fluid vh-100 d-flex align-items-center">
        <div className="row w-100">
          {/* Left Intro Section */}
          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center px-5">
            <h1 className="fw-bold mb-3" style={{ color: "#0d1b2a" }}>
              Student Portal
            </h1>
            <p className="fs-5 text-muted" style={{ maxWidth: "500px" }}>
              Welcome to your all-in-one student portal — a single place to view
              grade reports, pay fees securely, and register for upcoming
              courses with ease. Stay organized and manage your academic journey
              effortlessly.
            </p>
          </div>

          {/* Right Login Section */}
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
            <div className="card shadow-sm bg-light p-4" style={{ maxWidth: "400px", width: "100%" }}>
              <h3 className="text-center mb-4">Student Login</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/* Password */}
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label htmlFor="password" className="form-label mb-0">
                    Password
                  </label>
                  <a href="/forgot-password" className="small text-decoration-none">
                    Forgot password?
                  </a>
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                

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
