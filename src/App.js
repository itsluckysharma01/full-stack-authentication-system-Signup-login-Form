import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Catch all route - redirect to signup */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            padding: "10px",
            color: "#3d405b",
            fontSize: "14px",
          }}
        >
          <h6>By: Lucky Sharma</h6>
        </div>
      </div>
    </Router>
  );
};

export default App;
