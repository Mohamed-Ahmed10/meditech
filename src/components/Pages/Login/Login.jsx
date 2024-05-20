import { useState } from "react";
import image from "../../images/Doctor.png";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getLoginInfo } from "../../store/slice/login-slice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const checkLogin = useSelector((state) => state.user);

  const navigate = useNavigate();

  // State
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // data
  const data = {
    email,
    password,
  };
  return (
    <div className="row-login d-flex">
      <form action="schedule.html" className="login-form">
        <div className="cotent-center  ">
          <h1 className="tittel  fa-3x">
            <i className="fas  fa-stethoscope pe-4 "></i>
            MediTech
          </h1>
          <p className="text-left pb-3 subTitle">Log in to your Account </p>
          <div className="input-field mb-3 pt-1 pb-1 position-relative">
            <i className="fas fa-envelope ps-2 pe-2"></i>
            <input
              type="email"
              className="box"
              placeholder="Email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-field mb-3  pt-1 pb-1 position-relative">
            <i className="fas fa-lock ps-2 pe-2 "></i>
            <input
              type={showPassword ? "password" : "text"}
              className="box"
              placeholder="Password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-pass end-0 position-absolute "
            >
              {showPassword ? (
                <i className="fas fa-eye pe-2"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </span>
          </div>
          <div className="check my-3">
            <input type="checkbox" value="Remember me" id="remember" />
            <label htmlFor="remember" className="ms-2">Remember me</label>
          </div>
          <button
            type="button"
            value="login"
            id="submit"
            className=" pt-1 pb-1"
            onClick={(e) => {
              dispatch(getLoginInfo(data)).then((res) => {
                if (res.payload) {
                  navigate("/schedule")
                } else {
                  navigate("/login")
                }
              });
            }}
          >{checkLogin.loading ? "Loading....." : "Login"}</button>
        </div>
      </form>
      <div className="content-login  ">
        <div className="content-login-top text-center ">
          <img src={image} alt="Doctor" />
        </div>

        <p className="text-right mt-3">
          Connect with every application <br />
        </p>
      </div>
    </div>
  );
};

export default Login;