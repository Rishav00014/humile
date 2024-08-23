import React, { useState, useEffect } from "react";

//img
import emilyz from "../images/sn-logo.png";

// axios
import axios from "axios";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Change = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    setId(props.match.params.id);
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword || password !== confirmPassword) {
      const errors = {};

      if (!password) {
        errors.password = "Please enter password!";
      }
      if (!confirmPassword) {
        errors.confirmPassword = "Please enter confirm password!";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "Password & Confirm Password does not match";
      }

      return setError({ ...errors });
    }
    const data = {
      newPass: password,
      confirmPass: confirmPassword,
    };

    axios
      .post(`/admin/setpassword/${id}`, data)
      .then((res) => {
        setOpenSuccess(true);
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  return (
    <div class="wrapper">
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Password update successfully.
        </Alert>
      </Snackbar>
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
                        <h2 class="title">Change Password</h2>
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
                            <label>New Password</label>
                            <input
                              type="password"
                              class="form-control"
                              placeholder="New Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...errors,
                                    password: "Please enter password!",
                                  });
                                } else {
                                  return setError({
                                    ...errors,
                                    password: "",
                                  });
                                }
                              }}
                            />
                            {errors.password && (
                              <div
                                class="pl-1 text-left mb-3"
                                style={{ marginTop: -12 }}
                              >
                                <Typography
                                  variant="caption"
                                  style={{ color: "#D450D9" }}
                                >
                                  {errors.password}
                                </Typography>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (!e.target.value) {
                                  return setError({
                                    ...errors,
                                    confirmPassword:
                                      "Please enter confirm password!",
                                  });
                                } else {
                                  return setError({
                                    ...errors,
                                    confirmPassword: "",
                                  });
                                }
                              }}
                            />
                            {errors.confirmPassword && (
                              <div
                                class="pl-1 text-left mb-3"
                                style={{ marginTop: -12 }}
                              >
                                <Typography
                                  variant="caption"
                                  style={{ color: "#D450D9" }}
                                >
                                  {errors.confirmPassword}
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
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Change;
