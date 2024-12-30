import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import { ThemeProvider } from "./context/toggleContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
    {/* <ThemeProvider> */} 
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    {/* </ThemeProvider> */}
    </>
  );
}

export default App;
