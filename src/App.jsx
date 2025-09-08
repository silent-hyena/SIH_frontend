import './App.css'
// import { useState } from 'react'





import { Routes, Route } from 'react-router-dom'
// import FormLogin from './Form.jsx'
import NewAdmission from './NewAdmission.jsx'
import Home from './Home.jsx'


function App() {
  
  return (
    <>
      
        {/* mapping route/path to react componenets:  */}

        <div className="container-fluid  p-0 m-0">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/newAdmission" element={<NewAdmission />} />
              <Route path="/counselling" element={<Home />} />
              <Route path="/feeStructure" element={<Home />} />
              <Route path="/studentLogin" element={<Home />} />
              <Route path="/programmes/undergraduate" element={<Home />} />
              <Route path="/programmes/postgraduate" element={<Home />} />
              <Route path="/institute/history" element={<Home />} />
              <Route path="/institute/location" element={<Home />} />
              <Route path="/admin/login" element={<Home />} />
              <Route path="/professor/login" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
            </Routes>
          </div>

    </>
  )
}

export default App
