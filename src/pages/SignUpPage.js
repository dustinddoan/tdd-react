import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";

const SignUpPage = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    const errorsCopy = { ...errors };

    delete errorsCopy[id];
    setErrors(errorsCopy);

    setSignUpInfo({
      ...signUpInfo,
      [id]: value,
    });
  };

  const comparePassword = () => {
    let disabled = true;
    let { password, passwordRepeat } = signUpInfo;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }

    return disabled;
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = signUpInfo;
    const body = {
      username,
      email,
      password,
    };

    setApiProgress(true);

    // console.log("api: ", apiProgress);
    try {
      let res = await axios.post("/api/1.0/users", body);
      // console.log("response: ", res);
      if (res.status === 200) {
        setApiProgress(false);
        setSignUpSuccess(true);
      }
    } catch (error) {
      setApiProgress(false);
      // console.log("error: ", error.response);
      if (error.response.status === 400) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  return (
    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      {!signUpSuccess && (
        <form className="card mt-5" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>

          <div className="card-body">
            <Input
              id="username"
              label="Username"
              onChange={handleChange}
              help={errors.username}
            />

            <Input
              id="email"
              label="Email"
              onChange={handleChange}
              help={errors.email}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              onChange={handleChange}
              help={errors.password}
            />

            <Input
              id="passwordRepeat"
              label="Password Repeat"
              type="password"
              onChange={handleChange}
              help={
                signUpInfo.password !== signUpInfo.passwordRepeat
                  ? "Password mismatch"
                  : ""
              }
            />

            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={comparePassword() || apiProgress}
                onClick={hanldeSubmit}
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      )}
      {signUpSuccess && (
        <div className="alert alert-success mt-3">
          Please check your e-mail to activate your account
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
