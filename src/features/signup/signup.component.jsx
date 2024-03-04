/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserExistence,
  signinWithGoogle,
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
import { USER_ALREADY_EXISTS } from "../../utils/errorTypes";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const signWithGoogle = () => {
    console.log("here");
    dispatch(signinWithGoogle());
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
              value={email}
              onChange={handleChange}
              placeholder="Eg: user@gmail.com"
            />
            {error && (
              <div className="warning">
                <img src={warning} alt="" />
                <div className="text">
                  {error.message}{" "}
                  <Link to="/login" className="link">
                    Log in
                  </Link>
                </div>
              </div>
            )}
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
              onClick={signWithGoogle}
            ></Button>
            <Button
              label="Sign up with Facebook"
              type="button"
              icon={facebookIcon}
              style="outline"
            ></Button>
          </div>
        </form>
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
      <Step1 />
    </div>
  );
};

export default Signup;
