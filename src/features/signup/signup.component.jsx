/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserExistence,
  signinWithGoogle,
  signInWithFacebook,
  signup,
} from "../../redux/slices/auth/auth.actions";
import Input from "../../components/input/input.component";
import Button from "../../components/button/button.component";
import { emailValidation } from "../../utils/validation.util";
import "./signup.styles.scss";
import warning from "../../assets/icons/shield-exclamation.png";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import arrowLeftIcon from "../../assets/icons/arrow-left.png";

const Signup = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (event) => {
    console.log(event.target);
    const { value, name } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Components
  const Warning = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }, []);

    return (
      show && (
        <div className="warning">
          <img src={warning} alt="" />
          <div className="text">
            {error.message}{" "}
            <Link to="/login" className="link">
              Log in
            </Link>
          </div>
        </div>
      )
    );
  };

  const Step1 = () => {
    return (
      <div className="step step1">
        <h1>Sign Up to start listening</h1>
        <form onSubmit={handleStep}>
          <div className="form-control">
            <Input
              label="Email address"
              name="email"
              validation={emailValidation}
              type="email"
              value={credentials.email}
              handleChange={handleChange}
              placeholder="Eg: user@gmail.com"
            />
            {error && <Warning />}
          </div>
          <Button label="Next" type="submit" loading={loading} />
          <div className="divider">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>
          <div className="buttons">
            <Button
              label="Sign up with Google"
              type="button"
              icon={googleIcon}
              style="outline"
              onClick={() => dispatch(signinWithGoogle())}
            ></Button>
            <Button
              label="Sign up with Facebook"
              type="button"
              icon={facebookIcon}
              style="outline"
              onClick={() => dispatch(signInWithFacebook())}
              disabled={true}
            ></Button>
          </div>
          <div className="divider">
            <div className="line"></div>
          </div>
          <div className="redirect">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Log in
            </Link>
          </div>
        </form>
      </div>
    );
  };

  const Step2 = () => {
    return (
      <div className="step step2">
        <div className="header-wrapper">
          <div className="left">
            <img src={arrowLeftIcon} alt="" />
          </div>
          <div className="right">
            <div className="header">
              <div className="header-title">
                <div className="subtitle">Step 1 of 3</div>
                <h4 className="title">Create a password</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="password">
            <Input
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              handleChange={handleChange}
            />
          </div>
          <div className="instructions">
            <div className="text">Your password must contain at least</div>
            <ul className="points">
              <li className="point">1 letter</li>
              <li className="point">
                1 number or special character(example: # ? ! &)
              </li>
              <li className="point">10 characters</li>
            </ul>
            <div className="button-wrapper">
              <Button type="button" label="Next" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleStep = (e) => {
    e.preventDefault();
    try {
      dispatch(checkUserExistence(email));
      // Signup successful, you can redirect to another page or show a success message
    } catch (error) {
      // Handle signup error, you can show an error message
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="signup">
      <Step2 />
    </div>
  );
};

export default Signup;
