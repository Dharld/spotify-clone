/* eslint-disable react/no-unescaped-entities */
import Logo from "../../components/logo/logo.component";
import Button from "../../components/button/button.component";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import Input from "../../components/input/input.component";
import { emailValidation } from "../../utils/validation.util";
import { Link } from "react-router-dom";
import "./login.styles.scss";

const Login = () => {
  const handleChange = () => {};

  return (
    <div className="login">
      <header>
        <nav className="navbar">
          <Logo />
        </nav>
      </header>
      <form className="login-form">
        <div className="wrapper">
          <h1>Log in to Spotify</h1>
          <div className="buttons">
            <Button
              label="Sign up with Google"
              type="button"
              icon={googleIcon}
              style="outline"
              onClick={() => {}}
            ></Button>
            <Button
              label="Sign up with Facebook"
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
              value={""}
              handleChange={handleChange}
              placeholder="Eg: user@gmail.com"
            />
          </div>
          <div className="input-wrapper">
            <Input
              label="Password"
              name="password"
              type="password"
              value={""}
              handleChange={handleChange}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="button-wrapper wrapper">
          <Button
            label="Log in"
            type="submit"
            loading={false}
            onClick={() => {}}
          ></Button>
        </div>
        <div className="divider"></div>

        <div className="signup-redirect wrapper">
          Don't have an account ? <Link to="/signup">Signup for Spotify</Link>
        </div>
      </form>
      <div className="footer">
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </div>
    </div>
  );
};

export default Login;
