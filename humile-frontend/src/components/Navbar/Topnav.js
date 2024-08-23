/* eslint-disable  no-unused-vars */
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

//axios
import axios from "axios";

//custom css
import "../../assets/css/nucleo-icons.css";
import "../../assets/css/black-dashboard.css";

//js
import "../../assets/js/black-dashboard";
import "../../assets/js/plugins/perfect-scrollbar.jquery.min.js";
import "../../assets/js/core/popper.min.js";

//jquery
import $ from "jquery";

//redux
import { UNSET_ADMIN } from "../../store/admin/types";

//sweet alert
import {  warning } from "../../util/alert";

//img
import anime from "../../assets/img/anime3.png";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const dispatch = useDispatch();
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [errors, setError] = useState({
    title: "",
    image: "",
    description: "",
  });

  

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setImageData(null);
    setImagePath(null);
    setError({
      title: "",
      image: "",
      description: "",
    });
    setTitle("");
    setDescription("");
    $("#file").val("");
    $(".dropdown").removeClass("show");
    $(".dropdown-menu").removeClass("show");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      const errors = {};

      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    if (!imageData || !imagePath) {
      return setError({ ...errors, image: "Please select an Image!" });
    }

    setError({ ...errors, image: "" });

    

    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post("/notification", formData)
      .then((res) => {
        if (res.data.data === true) {
          setOpenSuccess(true);
          setOpen(false);

          setError({
            title: "",
            image: "",
            description: "",
          });
          $("#file").val("");
          setTitle("");
          setDescription("");
          setImageData(null);
          setImagePath(null);
          $(".dropdown").removeClass("show");
          $(".dropdown-menu").removeClass("show");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const history = useHistory();
  const handleLogout = () => {
    const data = warning();
    data
      .then((Logout) => {
        if (Logout) {
          dispatch({ type: UNSET_ADMIN });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Notification Send Successfully.
          </span>
        </Alert>
      </Snackbar>
      <nav class="navbar navbar-expand-lg navbar-absolute">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle d-inline">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href={() => false}>
              <Link to="/admin/dashboard" class="text-white">
                Humile
              </Link>
            </a>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse" id="navigation">
            <ul class="navbar-nav ml-auto">
              <li class="dropdown nav-item">
                <a
                  href={() => false}
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <div class="notification d-none d-lg-block d-xl-block"></div>

                  <i
                    class="tim-icons icon-bell-55"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Notification"
                  ></i>

                  <p class="d-lg-none ">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right dropdown-navbar notification-dropdown">
                  <h4 class="text-primary text-center py-3">Notification</h4>
                  <form>
                    <div class="row px-0 px-lg-4 px-xl-4">
                      <div class="col-md-12 pr-0 pr-md-2">
                        <div class="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            class="form-control text-dark"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...errors,
                                  title: "Title can't be a blank!",
                                });
                              } else {
                                return setError({
                                  ...errors,
                                  title: "",
                                });
                              }
                            }}
                          />
                          {errors.title && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors.title}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-md-12 pr-0 pr-md-2">
                        <div class="form-group">
                          <label>Description</label>
                          <input
                            type="text"
                            class="form-control text-dark"
                            placeholder="Description"
                            required
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...errors,
                                  description: "Description can't be a blank!",
                                });
                              } else {
                                return setError({
                                  ...errors,
                                  description: "",
                                });
                              }
                            }}
                          />
                          {errors.description && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors.description}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-md-12 pr-0 pr-md-2">
                        <label>Image</label>
                        <br />
                        <input
                          type="file"
                          name="image"
                          id="file"
                          accept="image/*"
                          onChange={handleInputImage}
                        />
                        {errors.image && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.image}
                            </Typography>
                          </div>
                        )}
                        {imagePath && (
                          <img
                            src={imagePath}
                            width="90px"
                            height="90px"
                            alt="img"
                            style={{
                              objectFit: "contain",
                              borderRadius: "10",
                            }}
                            class="my-3 ml-1"
                          ></img>
                        )}
                      </div>
                      <div class="col-md-12 mt-3">
                        <button
                          type="button"
                          class="btn btn-primary  float-right px-3"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          class="btn px-3 btn-default  float-right "
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </ul>
              </li>
              <li class="dropdown nav-item">
                <a
                  href
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                  // onClick={handleMobileDrawer}
                >
                  <div class="photo">
                    <img src={anime} alt="Profile" />
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">Log out</p>
                </a>
                <ul class="dropdown-menu dropdown-navbar">
                  <li class="nav-link">
                    <Link to="/admin/profile">
                      <a
                        href={() => false}
                        class="nav-item dropdown-item"
                        style={{ color: "black" }}
                      >
                        Profile
                      </a>
                    </Link>
                  </li>
                  <li class="nav-link">
                    <Link to="/admin/setting">
                      <a
                        href={() => false}
                        style={{ color: "black" }}
                        class="nav-item dropdown-item"
                      >
                        Settings
                      </a>
                    </Link>
                  </li>
                  <li class="dropdown-divider "></li>
                  <li class="nav-link">
                    <a
                      href={() => false}
                      class="nav-item dropdown-item"
                      style={{ color: "black", cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
              <li class="separator d-lg-none"></li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        class="modal modal-search fade"
        id="searchModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <input
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="SEARCH"
              />
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
