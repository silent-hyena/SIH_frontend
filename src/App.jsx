import './App.css'

import { Routes, Route,useLocation  } from 'react-router-dom'
import useEffect from "react"
import NewAdmission from './NewAdmission.jsx'
import Home from './Home.jsx'

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-6P7CYRW1TG", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

function App() {
   usePageTracking()
  
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
