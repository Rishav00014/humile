import React, { useState, useEffect } from "react";

//react-redux
import { useSelector, connect } from "react-redux";

//router
import { Link } from "react-router-dom";

//img
import emilyz from "../images/sn-logo.png";

//action
import { login } from "../store/admin/action";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [openEmailError, setOpenEmailError] = useState(false);
  const [openPasswordError, setOpenPasswordError] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const errors = useSelector((state) => state.admin.loginError);

  useEffect(() => {
    if (typeof errors === "string") {
      setError(errors);
    }
    if (typeof errors === "object") {
      errors.map((error) => {
        if (error?.email) {
          setEmail("");
          setOpenEmailError(true);
          setEmailError(error?.email);
        }

        if (error?.password) {
          setPassword("");
          setOpenPasswordError(true);
          setPasswordError(error?.password);
        }
        return true;
      });
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      const error = {};

      if (!email) {
        error.email = "Email is Required!";
      }
      if (!password) {
        error.password = "Password is Required!";
      }

      return setError({ ...error });
    }
    const data = { email,password}

    props.login(data);
  };



  const handleCloseError = () => {
    setOpenEmailError(false);
    setOpenPasswordError(false);
  };
  return (
    <>
      <Snackbar
        open={openEmailError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {emailError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openPasswordError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {passwordError}
        </Alert>
      </Snackbar>
      <div class="wrapper">
        <div class="main-panel">
          <div class="content">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-4">
                <div class="card card-user">
                  <div class="card-body">
                    <p class="card-text">
                      <div class="author">
                        <div class="block block-one"></div>
                        <div class="block block-two"></div>
                        <div class="block block-three"></div>
                        <div class="block block-four"></div>
                        <a href={() => false}>
                          <img class="avatar" src={emilyz} alt="..." />
                          <h2 class="title">Sign In</h2>
                        </a>
                        <p class="description">
                          Enter your email address and password to access admin
                          panel.
                        </p>
                      </div>
                    </p>
                    <div class="card-description">
                      <form class="px-4">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Email</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (!e.target.value) {
                                    return setError({
                                      ...error,
                                      email: "Email is Required!",
                                    });
                                  } else {
                                    return setError({
                                      ...error,
                                      email: "",
                                    });
                                  }
                                }}
                              />
                              {error.email && (
                                <div
                                  class="pl-1 text-left mb-2"
                                  style={{ marginTop: -15 }}
                                >
                                  <Typography
                                    variant="caption"
                                    style={{ color: "#D450D9" }}
                                  >
                                    {error.email}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>Password</label>
                              <input
                                type="password"
                                class="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);

                                  if (!e.target.value) {
                                    return setError({
                                      ...error,
                                      password: "Password is Required!",
                                    });
                                  } else {
                                    return setError({
                                      ...error,
                                      password: "",
                                    });
                                  }
                                }}
                              />
                              {error.password && (
                                <div
                                  class="pl-1 text-left  mb-2"
                                  style={{ marginTop: -15 }}
                                >
                                  <Typography
                                    variant="caption"
                                    style={{ color: "#D450D9" }}
                                  >
                                    {error.password}
                                  </Typography>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer px-4">
                     
                      <button
                        type="submit"
                        class="btn btn-fill btn-primary  btn-block"
                        onClick={handleSubmit}
                      >
                        Log In
                      </button>

                      <div class="row">
                        <div class="col-md-12">
                          <Link to="/forgot">
                            <p class="mt-3 float-right">
                              <u style={{ cursor: "pointer" }}>
                                Forgot Password?
                              </u>
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { login })(LoginPage);
