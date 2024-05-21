import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { unmountLogin } from "../store/slice/login-slice.js";
import logo from "../images/logo.png"
const Navbar = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  let checkIcon = null;
  if (user) {
    checkIcon = user.token;
  }
  function handleLogout() {
    dispatch(unmountLogin());
    localStorage.removeItem("user");
  }
  return (
    <section>
      <nav className="navbar navbar-expand-lg sticky-top ">
        <div className="container">
          <h3 className="first-text">
            <img src={logo} alt="Logo" width={140} />
          </h3>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main"
            aria-controls="main"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center text-center  "
            id="main"
          >
            {/* <ul className="navbar-nav ">
              <li className="nav-item">
                <NavLink
                  className="nav-link p-lg-3 text-decoration-none  "
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link p-lg-3 text-decoration-none"
                  to={checkIcon ? "/schedule" : "/login"}
                >
                  Schedule
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link p-lg-3 text-decoration-none" to={"/login"}>
                  login
                </NavLink>
              </li>
            </ul> */}
          </div>
          {checkIcon ? (
            <div className="nav-icon">
              <NavLink className="mx-1" to={"/profile"}>
                <i className="fa-regular fa-user pe-2"></i>
              </NavLink>
              <NavLink className="mx-1" to={"/login"} onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </NavLink>
            </div>
          ) :
            <NavLink className="nav-link p-lg-3 text-decoration-none" to={"/login"}>
              <i className="fa-solid fa-right-to-bracket text-white"></i>
            </NavLink>
          }
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
