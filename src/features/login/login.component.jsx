/* eslint-disable react/no-unescaped-entities */
import Logo from "../../components/logo/logo.component";
import Button from "../../components/button/button.component";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import Input from "../../components/input/input.component";
import { emailValidation } from "../../utils/validation.util";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signinWithGoogle } from "../../redux/slices/auth/auth.actions";
import { useToast } from "../../context/toaster.context";
import { errors } from "../../utils/firebase.error";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  const [userCreds, setUserCreds] = useState(INITIAL_STATE);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (error) {
      errorToast(error.message);
    }
  }, [error]);

  useEffect(() => {
    const handleToken = async (token) => {
      if (token) {
        const res = await dispatch(login({ token }));
        if (res.success) {
          successToast("Login successful!");
          navigate("/");
        } else {
          errorToast(res.error.message);
        }
      }
    };
    handleToken();
  }, []);

  const handleChange = () => {
    setUserCreds({ ...userCreds, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await dispatch(login(userCreds));
    if (!res.error) {
      successToast("Login successful !");
      navigate("/");
    }
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    const res = await dispatch(signinWithGoogle());
    if (!res.error) {
      successToast("Login successful !");
      navigate("/");
    } else {
      const message = res.error.message;
      const start = message.indexOf("(");
      const end = message.lastIndexOf(")");
      const type = message.substring(start + 1, end);
      errorToast(errors[type]);
    }
  };

  return (
    <>
      <>{loading ? <div>Loading...</div> : null}</>
      <>
        {user ? (
          <Navigate to="/" />
        ) : (
          <div className="login">
            <header>
              <nav className="navbar">
                <Logo />
              </nav>
            </header>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="wrapper">
                <h1>Log in to Spotify</h1>
                <div className="buttons">
                  <Button
                    label="Continue with Google"
                    type="button"
                    icon={googleIcon}
                    style="outline"
                    onClick={handleGoogleSignIn}
                  ></Button>
                  <Button
                    label="Continue with Facebook"
                    type="button"
                    icon={facebookIcon}
                    style="outline"
                    onClick={() => {}}
                    disabled={true}
                  ></Button>
                </div>
              </div>

              <div className="divider"></div>
              <div className="inputs wrapper">
                <div className="input-wrapper">
                  <Input
                    label="Email"
                    name="email"
                    validation={emailValidation}
                    type="text"
                    value={userCreds.email}
                    handleChange={handleChange}
                    placeholder="Eg: user@gmail.com"
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={userCreds.password}
                    handleChange={handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="button-wrapper wrapper">
                <Button label="Log in" type="submit" loading={loading}></Button>
              </div>
              <div className="divider"></div>

              <div className="signup-redirect wrapper">
                Don't have an account ?{" "}
                <Link to="/signup">Signup for Spotify</Link>
              </div>
            </form>
            <div className="footer">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Login;
