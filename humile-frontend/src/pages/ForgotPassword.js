import React, { useState } from "react";

//axios
import axios from "axios";

//react router
import { Link } from "react-router-dom";

//img
import emilyz from "../images/sn-logo.png";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const [errors, setError] = useState({
    email: "",
  });

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      const errors = {};

      if (!email) {
        errors.email = "Email can't be a blank!";
      }

      return setError({ ...errors });
    }
    axios
      .post("/admin/sendemail", { email })
      .then((res) => {
        if (res.data.result) {
          setOpenSuccess(true);
          setEmail("");
        } else {
          setOpenError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setOpenError(true);
        // console.log(response?.data);
      });
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          Email does not exists.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Mail has been sent successfully.
          <br />
          Sometimes mail has been landed on your spam!
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
                          <h2 class="title">Forgot Password</h2>
                        </a>
                        <p class="description px-3">
                          If you have forgotten your password you can reset it
                          here!
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
                                      ...errors,
                                      email: "Email is Required!",
                                    });
                                  } else {
                                    return setError({
                                      ...errors,
                                      email: "",
                                    });
                                  }
                                }}
                              />
                              {errors.email && (
                                <div class="pl-1 text-left">
                                  <Typography
                                    variant="caption"
                                    style={{ color: "#D450D9" }}
                                  >
                                    {errors.email}
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
                        class="btn btn-fill btn-primary btn-block"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                      <div class="row">
                        <div class="col-md-12">
                          <Link to="/">
                            <p class="mt-3 float-right">
                              <u style={{ cursor: "pointer" }}>
                                Take Me Back to Login !
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

export default Forgot;
