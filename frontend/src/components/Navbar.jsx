import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 p-6 flex justify-between">
      {/* Brand Name */}
      <div>
        <h1 className="text-3xl font-bold text-blue-950 hover:text-purple-800 transition duration-300 ease-in-out">
          <NavLink to="/" className="outline-none">
            Note<span className="text-purple-800">App</span>
          </NavLink>
        </h1>
      </div>

      {/* Navigation Links */}
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mr-3 font-bold outline-none transition duration-300 ease-in-out ${
              isActive ? "text-purple-800 underline" : "text-blue-950 hover:text-purple-800"
            }`
          }
        >
          Home
        </NavLink>
        {!localStorage.getItem("token") ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `mr-3 font-bold outline-none transition duration-300 ease-in-out ${
                  isActive ? "text-purple-800 underline" : "text-blue-950 hover:text-purple-800"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `mr-3 font-bold outline-none transition duration-300 ease-in-out ${
                  isActive ? "text-purple-800 underline" : "text-blue-950 hover:text-purple-800"
                }`
              }
            >
              Signup
            </NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="mr-3 font-bold text-blue-950 hover:text-purple-800 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
