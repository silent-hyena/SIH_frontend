import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
function Home() {
  return (
    <>

      <div className="container-fluid bg-info-subtle">
        <div className="row">
          {/* Logo Section */}
          <div className="col-2 college-logo">
            <img src="/college-logo.jpg" className="rounded-circle" alt="College Logo" />
          </div>

          {/* Title Section */}
          <div className="col-10 college-title">
            <h1>Student Management System</h1>
          </div>
        </div>
      </div>
      <Navbar />

    </>
  )
}
export default Home;

