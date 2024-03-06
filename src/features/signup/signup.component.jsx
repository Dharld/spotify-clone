/* eslint-disable react/display-name */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
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
import Select from "../../components/select/select.component.jsx";
import DOB from "../../components/dob/dob.component.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(3);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials((credentials) => ({ ...credentials, [name]: value }));
  };

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
  }; // Components

  const Step1 = useMemo(() => {
    const handleStep = async (e) => {
      e.preventDefault();
      try {
        const request = dispatch(checkUserExistence(credentials.email));
        const data = await request;
        if (!data.error) {
          setCredentials({ ...credentials, email: credentials.email });
          setStep(step + 1);
        }
        // Signup successful, you can redirect to another page or show a success message
      } catch (error) {
        // Handle signup error, you can show an error message
        console.error("Signup failed:", error.message);
      }
    };

    return (
      <div className="step step1">
        <h1>Sign Up to start listening</h1>
        <form onSubmit={handleStep}>
          <div className="form-control">
            <Input
              label="Email address"
              name="email"
              validation={emailValidation}
              type="text"
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
  }, [credentials.email, loading]);

  const Step2 = useMemo(() => {
    const { password } = credentials;

    const rules = [
      {
        name: "1 Letter",
        validate: (value) => /[a-zA-Z]+/.test(value),
      },
      {
        name: "1 Number or special character",
        validate: (value) =>
          /[0-9@;:~!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(value),
      },
      {
        name: "10 Characters",
        validate: (value) => /.{10,}/.test(value),
      },
    ];

    const handleStep = async (e) => {
      const validation = rules.reduce((res, r) => {
        res = res && r.validate(password);
        return res;
      }, true);
      if (validation) {
        setCredentials({ ...credentials, password });
        setStep(step + 1);
      }
    };

    return (
      <div className="step step2">
        <div className="header-wrapper">
          <div className="left" onClick={() => setStep(step - 1)}>
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
              {rules.map((rule) => (
                <li
                  className={`point ${rule.validate(password) ? "active" : ""}`}
                  key={rule.name}
                >
                  {rule.name}
                </li>
              ))}
            </ul>
            <div className="button-wrapper">
              <Button type="button" label="Next" onClick={handleStep} />
            </div>
          </div>
        </div>
      </div>
    );
  }, [credentials.password]);

  const Step3 = useMemo(() => {
    const items = ["January", "February", "March", "April", "May"];
    return (
      <div className="step step3">
        <div className="header-wrapper">
          <div className="left" onClick={() => setStep(step - 1)}>
            <img src={arrowLeftIcon} alt="" />
          </div>
          <div className="right">
            <div className="header">
              <div className="header-title">
                <div className="subtitle">Step 2 of 3</div>
                <h4 className="title">Tell us about yourself</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <Input
            type="text"
            label="Name"
            sublabel="This name will appear on your profile"
            name="displayName"
          />
          <DOB />
        </div>
      </div>
    );
  });

  return (
    <div className="signup">
      {step === 1 ? Step1 : step === 2 ? Step2 : Step3}
    </div>
  );
};

export default Signup;
