
import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MapPage from "./pages/MapPage";


function App() {

  return (
    <Router>

      <Routes>
    
      <Route exact path="/" element={<LoginPage/>} />

      <Route  path="/register" element={<SignupPage/>} />

      <Route path="/dashboard" element={<Dashboard/>} />

      <Route path="/map" element={<MapPage/>} />
      </Routes>

    </Router>
  );
}

export default App;
