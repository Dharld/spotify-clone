/* eslint-disable react/no-unescaped-entities */
import Logo from "../../components/logo/logo.component";
import Button from "../../components/button/button.component";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import Input from "../../components/input/input.component";
import { emailValidation } from "../../utils/validation.util";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./login.styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signinWithGoogle } from "../../redux/slices/auth/auth.actions";
import { useToast } from "../../context/toaster.context";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const INITIAL_SPOTIFY_TOKEN = localStorage.getItem("spotifyToken") ?? null;

const Login = () => {
  const [userCreds, setUserCreds] = useState(INITIAL_STATE);
  const [spotifyToken, setSpotifyToken] = useState(INITIAL_SPOTIFY_TOKEN);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const spotyToken = queryParams.get("spotifyToken");
    if (spotyToken) {
      localStorage.setItem("spotifyToken", spotyToken);
      setSpotifyToken(spotyToken);
    }
  }, []);

  useEffect(() => {
    const handleToken = async (token) => {
      if (token) {
        const res = await dispatch(login({ token }));
        if (res.success) {
          successToast("Login successful!");
        }
      }
    };
    const token = localStorage.getItem("token");
    token && handleToken(token);
  }, []);

  useEffect(() => {
    if (error) {
      errorToast(error.message);
    }
  }, [error]);

  const handleChange = (event) => {
    setUserCreds({ ...userCreds, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await dispatch(login(userCreds));
    if (!res.error) {
      successToast("Login successful !");
    }
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    const res = await dispatch(signinWithGoogle());
    if (!res.error) {
      successToast("Login successful !");
      navigate("/");
    }
  };

  return (
    <>
      {loading ? (
        <div>...loading</div>
      ) : (
        <>
          {user && !spotifyToken ? (
            <Navigate to="/authorize-spotify" />
          ) : user && spotifyToken ? (
            <Navigate to="/" />
          ) : (
            <div className="login" id="login">
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
                  <Button
                    label="Log in"
                    type="submit"
                    loading={loading}
                  ></Button>
                </div>
                <div className="divider"></div>

                <div className="signup-redirect wrapper">
                  Don't have an account ?{" "}
                  <Link to="/signup">Signup for Spotify</Link>
                </div>
              </form>
              <div className="footer">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;
